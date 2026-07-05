#!/usr/bin/env python3
"""Generate inner pages from scraped metadata."""
import json, html

with open('/Users/punkit/Desktop/Sourav/data/pages.json') as f:
    pages = json.load(f)

HEAD = '''<!DOCTYPE html>
<html lang="en-US">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{title}</title>
  <meta name="description" content="{desc}">
  <link rel="icon" href="assets/images/cropped-LP-HITESH-180x180.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <div id="site-header"></div>
  <main>
{body}
  </main>
  <div id="site-footer"></div>
  <script src="js/layout.js"></script>
  <script src="js/main.js"></script>
</body>
</html>'''

TAIL = ''

SKIP = {'index', 'corporate-training-for-digital-marketing', 'contact'}

for slug, data in pages.items():
    if slug in SKIP:
        continue

    h1 = data['h1'][0] if data['h1'] else data['h2'][1] if len(data['h2']) > 1 else data['title']
    # filter out "Hitesh Motwani" from h2 list
    sections = [h for h in data['h2'] if h.lower() != 'hitesh motwani' and len(h) > 3][:8]

    cards_html = ''
    for i, section in enumerate(sections):
        desc_text = data['desc'] if i == 0 and data['desc'] else f"Expert-led training and consulting on {section.lower()} — tailored for corporates, teams, and business leaders."
        cards_html += f'''
        <div class="content-card">
          <h3>{html.escape(section)}</h3>
          <p>{html.escape(desc_text[:300])}</p>
        </div>'''

    body = f'''
    <section class="page-hero">
      <div class="container">
        <h1>{html.escape(h1)}</h1>
        <p>{html.escape(data['desc'] or 'Customised training for Generative AI, Machine Learning, & Digital Marketing — delivered online and onsite for corporates worldwide.')}</p>
        <a href="https://calendly.com/hitesh-analyst/online-consulting" class="btn" style="margin-top:20px" target="_blank" rel="noopener">Book A Call with HITESH</a>
      </div>
    </section>

    <section class="content-section">
      <div class="container">
        <h2 class="section-title">{html.escape(sections[0] if sections else 'Our Programs')}</h2>
        <div class="content-grid">{cards_html}
        </div>
      </div>
    </section>

    <section class="cta-banner">
      <div class="container">
        <h2>Get Your Team Trained By Hitesh</h2>
        <a href="https://calendly.com/hitesh-analyst/online-consulting" class="btn btn-blue" target="_blank" rel="noopener">BOOK A CALL WITH HITESH</a>
      </div>
    </section>'''

    filename = f'/Users/punkit/Desktop/Sourav/{slug}.html'
    content = HEAD.format(
        title=html.escape(data['title']),
        desc=html.escape(data['desc'] or data['title']),
        body=body
    )
    with open(filename, 'w') as f:
        f.write(content)
    print(f'Created {slug}.html')

print('Done')
