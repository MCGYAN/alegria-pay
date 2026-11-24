"""Visual Alegria Pay presentation with screenshots and simple infographics."""
from pathlib import Path

from pptx import Presentation
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE
from pptx.enum.text import PP_ALIGN
from pptx.util import Inches, Pt

ROOT = Path(__file__).parent
OUT = ROOT / "Alegria_Pay_Presentation_VISUAL.pptx"
IMG = ROOT / "images"

DARK = RGBColor(0x1F, 0x2A, 0x26)
GRAY = RGBColor(0x5F, 0x6E, 0x68)
WHITE = RGBColor(0xFF, 0xFF, 0xFF)
GREEN = RGBColor(0x1B, 0x7A, 0x64)
LIGHT = RGBColor(0xF5, 0xF7, 0xF6)


def set_run(run, size=20, bold=False, color=DARK, font="Calibri"):
    run.font.size = Pt(size)
    run.font.bold = bold
    run.font.color.rgb = color
    run.font.name = font


def add_bg(slide, color):
    fill = slide.background.fill
    fill.solid()
    fill.fore_color.rgb = color


def add_rect(slide, left, top, width, height, color):
    shape = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, left, top, width, height)
    shape.fill.solid()
    shape.fill.fore_color.rgb = color
    shape.line.fill.background()
    return shape


def header(slide, title):
    add_rect(slide, Inches(0), Inches(0), Inches(10), Inches(0.85), GREEN)
    box = slide.shapes.add_textbox(Inches(0.5), Inches(0.2), Inches(9), Inches(0.5))
    p = box.text_frame.paragraphs[0]
    r = p.add_run()
    r.text = title
    set_run(r, 26, True, WHITE)


def add_picture_safe(slide, path, left, top, width=None, height=None):
    path = Path(path)
    if not path.exists():
        print("Missing image:", path)
        return None
    kwargs = {}
    if width is not None:
        kwargs["width"] = width
    if height is not None:
        kwargs["height"] = height
    return slide.shapes.add_picture(str(path), left, top, **kwargs)


def text_box(slide, left, top, width, height, lines, size=18, bold_first=False, center=False):
    box = slide.shapes.add_textbox(left, top, width, height)
    tf = box.text_frame
    tf.word_wrap = True
    for i, line in enumerate(lines):
        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        p.alignment = PP_ALIGN.CENTER if center else PP_ALIGN.LEFT
        p.space_after = Pt(6)
        r = p.add_run()
        r.text = line
        set_run(r, size, bold=(bold_first and i == 0), color=DARK)
    return box


def title_slide(prs):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    add_bg(slide, WHITE)
    add_rect(slide, Inches(0), Inches(0), Inches(10), Inches(0.3), GREEN)

    box = slide.shapes.add_textbox(Inches(0.6), Inches(0.45), Inches(8.8), Inches(1.5))
    tf = box.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.alignment = PP_ALIGN.CENTER
    r = p.add_run()
    r.text = "Alegria Pay"
    set_run(r, 34, True, GREEN)

    p2 = tf.add_paragraph()
    p2.alignment = PP_ALIGN.CENTER
    r2 = p2.add_run()
    r2.text = "A simple bank app for Ghana"
    set_run(r2, 20, False, DARK)

    p3 = tf.add_paragraph()
    p3.alignment = PP_ALIGN.CENTER
    r3 = p3.add_run()
    r3.text = "Case Study 6  |  WUCS305 / WICT405  |  December 2026"
    set_run(r3, 14, False, GRAY)

    add_picture_safe(slide, IMG / "login.png", Inches(1.2), Inches(2.2), width=Inches(7.6))

    foot = slide.shapes.add_textbox(Inches(0.6), Inches(6.85), Inches(8.8), Inches(0.4))
    fp = foot.text_frame.paragraphs[0]
    fp.alignment = PP_ALIGN.CENTER
    fr = fp.add_run()
    fr.text = "[Insert student names and IDs]"
    set_run(fr, 14, False, GRAY)


def problem_slide(prs):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    add_bg(slide, WHITE)
    header(slide, "1. The problem (easy version)")
    text_box(
        slide,
        Inches(0.5),
        Inches(1.0),
        Inches(9),
        Inches(0.55),
        ["Old banks used paper. That made money hard to track. Alegria Pay puts everything in one app."],
        size=18,
    )
    add_picture_safe(slide, IMG / "infographic_problem.png", Inches(0.45), Inches(1.7), width=Inches(9.1))


def features_slide(prs):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    add_bg(slide, WHITE)
    header(slide, "2. What the app can do")
    text_box(
        slide,
        Inches(0.5),
        Inches(1.0),
        Inches(9),
        Inches(0.5),
        ["Think of it like a school lunch account, but for a bank in Ghana using GH₵."],
        size=18,
    )
    add_picture_safe(slide, IMG / "infographic_features.png", Inches(0.45), Inches(1.65), width=Inches(9.1))


def roles_slide(prs):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    add_bg(slide, WHITE)
    header(slide, "3. Who uses it?")
    text_box(
        slide,
        Inches(0.5),
        Inches(1.0),
        Inches(9),
        Inches(0.5),
        ["Four kinds of people open the same app. Each person sees different buttons."],
        size=18,
    )
    add_picture_safe(slide, IMG / "infographic_roles.png", Inches(0.45), Inches(1.65), width=Inches(9.1))


def flow_slide(prs):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    add_bg(slide, WHITE)
    header(slide, "4. How money moves")
    add_picture_safe(slide, IMG / "infographic_flow.png", Inches(0.35), Inches(1.0), width=Inches(9.3))
    add_picture_safe(slide, IMG / "transactions.png", Inches(1.3), Inches(4.15), width=Inches(7.4))


def build_slide(prs):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    add_bg(slide, WHITE)
    header(slide, "5. How the system is built")
    text_box(
        slide,
        Inches(0.5),
        Inches(1.0),
        Inches(9),
        Inches(0.5),
        ["Three layers work together: Screen, Brain, and Memory."],
        size=18,
    )
    add_picture_safe(
        slide, IMG / "infographic_architecture.png", Inches(0.45), Inches(1.6), width=Inches(9.1)
    )


def software_slide(prs):
    """Dashboard + reports side by side for one glance."""
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    add_bg(slide, WHITE)
    header(slide, "6. Look inside the software")
    text_box(
        slide,
        Inches(0.4),
        Inches(0.95),
        Inches(4.5),
        Inches(0.35),
        ["Customer dashboard"],
        size=16,
        bold_first=True,
    )
    text_box(
        slide,
        Inches(5.1),
        Inches(0.95),
        Inches(4.5),
        Inches(0.35),
        ["Manager reports"],
        size=16,
        bold_first=True,
    )
    add_picture_safe(slide, IMG / "dashboard.png", Inches(0.35), Inches(1.4), width=Inches(4.6))
    add_picture_safe(slide, IMG / "reports.png", Inches(5.05), Inches(1.4), width=Inches(4.6))


def closing_slide(prs):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    add_bg(slide, WHITE)
    header(slide, "8. Live demo and thank you")

    steps = [
        ("Step 1", "Customer sends money"),
        ("Step 2", "Manager approves a loan"),
        ("Step 3", "Open Reports page"),
    ]
    x = 0.5
    for title, desc in steps:
        shape = add_rect(slide, Inches(x), Inches(1.15), Inches(2.9), Inches(1.35), LIGHT)
        shape.line.color.rgb = GREEN
        text_box(
            slide,
            Inches(x + 0.1),
            Inches(1.3),
            Inches(2.7),
            Inches(1.1),
            [title, desc],
            size=17,
            bold_first=True,
            center=True,
        )
        x += 3.1

    text_box(
        slide,
        Inches(0.5),
        Inches(2.75),
        Inches(5.2),
        Inches(2.8),
        [
            "Try these logins:",
            "Customer: akosua@email.com / customer123",
            "Manager: manager@alegriapay.gh / manager123",
            "Teller: teller@alegriapay.gh / teller123",
            "Admin: admin@alegriapay.gh / admin123",
            "",
            "Thank you. Questions are welcome.",
        ],
        size=16,
        bold_first=True,
    )

    add_picture_safe(slide, IMG / "login.png", Inches(5.6), Inches(2.75), width=Inches(3.9))


def main():
    prs = Presentation()
    prs.slide_width = Inches(10)
    prs.slide_height = Inches(7.5)

    title_slide(prs)      # 1
    problem_slide(prs)    # 2
    features_slide(prs)   # 3
    roles_slide(prs)      # 4
    flow_slide(prs)       # 5
    build_slide(prs)      # 6
    software_slide(prs)   # 7
    closing_slide(prs)    # 8

    prs.save(OUT)
    print(f"Saved {OUT} with 8 slides")
    for p in sorted(IMG.glob("*.png")):
        print(" ", p.name)


if __name__ == "__main__":
    main()
