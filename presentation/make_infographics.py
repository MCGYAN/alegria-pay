"""Create simple kid-friendly infographic PNGs for the presentation."""
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

OUT = Path(__file__).parent / "images"
OUT.mkdir(exist_ok=True)

GREEN = (27, 122, 100)
GREEN_SOFT = (232, 245, 240)
BLUE = (47, 111, 237)
BLUE_SOFT = (234, 241, 255)
ORANGE = (196, 106, 47)
ORANGE_SOFT = (255, 243, 232)
RED = (192, 57, 43)
RED_SOFT = (253, 236, 234)
INK = (31, 42, 38)
GRAY = (95, 110, 104)
WHITE = (255, 255, 255)
LINE = (226, 232, 229)


def font(size, bold=False):
    candidates = [
        r"C:\Windows\Fonts\arialbd.ttf" if bold else r"C:\Windows\Fonts\arial.ttf",
        r"C:\Windows\Fonts\calibrib.ttf" if bold else r"C:\Windows\Fonts\calibri.ttf",
        r"C:\Windows\Fonts\segoeuib.ttf" if bold else r"C:\Windows\Fonts\segoeui.ttf",
    ]
    for path in candidates:
        if Path(path).exists():
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()


def rounded(draw, box, fill, radius=18):
    draw.rounded_rectangle(box, radius=radius, fill=fill)


def center_text(draw, text, xy, fnt, fill=INK):
    x, y = xy
    bbox = draw.textbbox((0, 0), text, font=fnt)
    w = bbox[2] - bbox[0]
    h = bbox[3] - bbox[1]
    draw.text((x - w / 2, y - h / 2), text, font=fnt, fill=fill)


def problem_solution():
    img = Image.new("RGB", (1400, 620), WHITE)
    d = ImageDraw.Draw(img)
    title = font(36, True)
    body = font(28)
    small = font(24, True)

    d.text((60, 30), "Old way vs Alegria Pay", font=title, fill=INK)

    rounded(d, (60, 110, 660, 560), RED_SOFT, 24)
    rounded(d, (740, 110, 1340, 560), GREEN_SOFT, 24)

    center_text(d, "BEFORE", (360, 170), small, RED)
    center_text(d, "Paper and spreadsheets", (360, 250), body)
    center_text(d, "Lost records", (360, 320), body)
    center_text(d, "Hard to track money", (360, 390), body)
    center_text(d, "Slow branch reports", (360, 460), body)

    center_text(d, "NOW", (1040, 170), small, GREEN)
    center_text(d, "One online system", (1040, 250), body)
    center_text(d, "Clear account balances", (1040, 320), body)
    center_text(d, "Easy transfers and loans", (1040, 390), body)
    center_text(d, "Fast branch reports", (1040, 460), body)

    # Arrow
    d.polygon([(670, 320), (730, 290), (730, 350)], fill=GREEN)
    img.save(OUT / "infographic_problem.png")


def who_uses():
    img = Image.new("RGB", (1400, 520), WHITE)
    d = ImageDraw.Draw(img)
    title = font(36, True)
    label = font(26, True)
    hint = font(22)
    d.text((60, 25), "Who uses Alegria Pay?", font=title, fill=INK)

    roles = [
        ("Customer", "Saves and sends money", GREEN, GREEN_SOFT),
        ("Teller", "Helps at the counter", BLUE, BLUE_SOFT),
        ("Manager", "Approves loans", ORANGE, ORANGE_SOFT),
        ("Admin", "Looks after the system", GRAY, LINE),
    ]
    x = 50
    for name, desc, color, soft in roles:
        rounded(d, (x, 110, x + 300, 460), soft, 24)
        d.ellipse((x + 95, 150, x + 205, 260), fill=color)
        center_text(d, name[0], (x + 150, 205), font(42, True), WHITE)
        center_text(d, name, (x + 150, 320), label, INK)
        center_text(d, desc, (x + 150, 380), hint, GRAY)
        x += 340
    img.save(OUT / "infographic_roles.png")


def money_flow():
    img = Image.new("RGB", (1400, 480), WHITE)
    d = ImageDraw.Draw(img)
    title = font(36, True)
    label = font(26, True)
    hint = font(22)
    d.text((60, 25), "How money moves", font=title, fill=INK)

    steps = [
        ("1. Sign in", "Open Alegria Pay"),
        ("2. Pick account", "Savings or current"),
        ("3. Move money", "Deposit, withdraw, transfer"),
        ("4. See update", "Balance changes now"),
    ]
    x = 40
    for i, (name, desc) in enumerate(steps):
        rounded(d, (x, 120, x + 280, 380), GREEN_SOFT if i % 2 == 0 else BLUE_SOFT, 22)
        center_text(d, name, (x + 140, 200), label, INK)
        center_text(d, desc, (x + 140, 280), hint, GRAY)
        if i < 3:
            d.polygon([(x + 290, 250), (x + 330, 230), (x + 330, 270)], fill=GREEN)
        x += 350
    img.save(OUT / "infographic_flow.png")


def architecture():
    img = Image.new("RGB", (1400, 520), WHITE)
    d = ImageDraw.Draw(img)
    title = font(36, True)
    label = font(28, True)
    hint = font(22)
    d.text((60, 25), "How the system is built (3 layers)", font=title, fill=INK)

    layers = [
        ("Screen", "What people see and click", BLUE, BLUE_SOFT),
        ("Brain", "Rules for money and loans", GREEN, GREEN_SOFT),
        ("Memory", "Stores all the bank data", ORANGE, ORANGE_SOFT),
    ]
    y = 110
    for name, desc, color, soft in layers:
        rounded(d, (180, y, 1220, y + 100), soft, 18)
        d.rounded_rectangle((180, y, 220, y + 100), radius=18, fill=color)
        d.text((260, y + 22), name, font=label, fill=INK)
        d.text((260, y + 58), desc, font=hint, fill=GRAY)
        y += 125
    img.save(OUT / "infographic_architecture.png")


def features():
    img = Image.new("RGB", (1400, 520), WHITE)
    d = ImageDraw.Draw(img)
    title = font(36, True)
    label = font(24, True)
    d.text((60, 25), "What Alegria Pay can do", font=title, fill=INK)

    items = [
        ("Accounts", "Save money"),
        ("Transfers", "Send money"),
        ("Loans", "Borrow money"),
        ("Cards", "Credit cards"),
        ("Branches", "Accra, Kumasi, Tema"),
        ("Reports", "See bank results"),
    ]
    positions = [
        (60, 110),
        (500, 110),
        (940, 110),
        (60, 300),
        (500, 300),
        (940, 300),
    ]
    colors = [GREEN_SOFT, BLUE_SOFT, ORANGE_SOFT, GREEN_SOFT, BLUE_SOFT, ORANGE_SOFT]
    for (name, desc), (x, y), soft in zip(items, positions, colors):
        rounded(d, (x, y, x + 400, y + 150), soft, 20)
        center_text(d, name, (x + 200, y + 55), label, INK)
        center_text(d, desc, (x + 200, y + 100), font(22), GRAY)
    img.save(OUT / "infographic_features.png")


if __name__ == "__main__":
    problem_solution()
    who_uses()
    money_flow()
    architecture()
    features()
    print("Infographics saved to", OUT)
