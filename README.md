# Actevra Engineering Website

Static corporate website for **Actevra Engineering**.

## Structure

- `index.html` — main landing page
- `styles.css` — responsive industrial design
- `script.js` — accessible navigation, email and enquiry copy helpers, existing GA4 integration
- `references/` — project case studies
- `insights/` — technical articles
- `solutions/` — detailed service information
- `en/` — matching English pages


Designed for static hosting with GitHub Pages.

## Contact form

The Turkish and English forms POST to `https://formsubmit.co/info@actevra.com.tr`.
FormSubmit handles email delivery and its default spam verification; no SMTP credentials
are included in the site. The `email` field supplies the visitor's reply-to address.
Submission opens in a new tab so the visitor retains their entered text. Email links,
address copying and copying the complete enquiry provide alternative contact paths.

**Owner activation is required before email delivery can be verified.** After deployment:

1. Submit an enquiry from the published site.
2. Open the confirmation email in `info@actevra.com.tr` and activate the form.
3. Verify that a subsequent enquiry arrives and that Reply addresses the sender.
   Complete any separate confirmation requested for the English form.

The code change does not verify ownership of the mailbox or claim that a message was
delivered. The site does not display a client-side "sent" confirmation. See
[FormSubmit setup](https://formsubmit.co/) for activation details.

## Maintenance checks

- Keep shared navigation and language links consistent across both languages.
- Keep project title, description, canonical URL and social metadata aligned.
- Keep case-study sections ordered: problem, approach, scope, outcome, technologies.
- After editing CSS or JavaScript, update their version query on every HTML page so
  cached assets cannot leave a freshly published page partially styled.
