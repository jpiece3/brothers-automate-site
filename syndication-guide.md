# Content Syndication Guide

Republish Brothers Automate blog posts to Medium, Dev.to, and LinkedIn Articles to earn backlinks and expand reach. All free.

## The Rule: Always Use Canonical Tags

Canonical tags tell Google "the original version lives at brothersautomate.com." Without them, Google may treat the syndicated version as a duplicate and split your ranking power.

- **Dev.to**: Add `canonical_url` to frontmatter. Google follows it. This is your best backlink platform.
- **Medium**: Use the "Import a story" feature (paste the original URL). Medium auto-sets the canonical.
- **LinkedIn Articles**: No canonical tag support. Treat as brand content, not a backlink play. Shorten the post to ~60% length.

## Platform Setup

### Dev.to
1. Create account at dev.to (use the Brothers Automate brand or James Pinder personal -- personal tends to perform better on Dev.to)
2. Go to Settings > Extensions > get your API key (save it, useful for future automation)
3. To publish: New Post > paste markdown > add `canonical_url` in the frontmatter editor
4. Tags: max 4 per post. Use `ai`, `automation`, `smallbusiness`, `productivity`

### Medium
1. Create a Medium account (recommend personal account under James Pinder, then create a "Brothers Automate" publication)
2. To import: Go to your profile > Stories > Import a story > paste the brothersautomate.com URL
3. Medium auto-imports the content and sets the canonical tag
4. Add 5 tags per post. Use: AI, Small Business, Automation, Marketing, Entrepreneurship
5. Submit to relevant Medium publications for more reach (Better Marketing, The Startup, Towards AI)

### LinkedIn Articles
1. Use the Brothers Automate company page or James Pinder's personal profile (personal profile articles get 5-10x more reach)
2. Click "Write article" from the LinkedIn homepage
3. Paste a condensed version (~60% of original length). LinkedIn readers skim aggressively.
4. Add a strong CTA at the bottom: "What's the first task in your business you'd automate?"
5. No canonical tag -- this is purely for brand awareness and engagement, not SEO backlinks

## First 5 Posts to Syndicate

Selected for: broad audience appeal, alignment with AI automation positioning, standalone value on external platforms.

### 1. "Marketing Automation AI: What Small Businesses Need to Know"
- **Original**: /blog/marketing-automation-ai/
- **Why**: Directly on-brand for the new positioning. Practical, data-driven, broad appeal. Strong Dev.to/Medium fit.
- **Dev.to tags**: `ai`, `automation`, `smallbusiness`, `marketing`
- **Medium tags**: AI, Small Business, Marketing Automation, Automation, Business

### 2. "Email Marketing Automation: The Small Business Playbook"
- **Original**: /blog/email-marketing-automation/
- **Why**: Evergreen topic, strong data points (41% of email orders from automations), actionable steps. Broad appeal beyond any one niche.
- **Dev.to tags**: `automation`, `productivity`, `smallbusiness`, `email`
- **Medium tags**: Email Marketing, Automation, Small Business, Marketing, Entrepreneurship

### 3. "Email Automation Tools: A Small Business Guide"
- **Original**: /blog/email-automation-tools/
- **Why**: Comparison/review posts perform well on Medium. Practical buying guidance. High search intent topic.
- **Dev.to tags**: `automation`, `productivity`, `tools`, `smallbusiness`
- **Medium tags**: Email Marketing, SaaS, Automation, Small Business, Tools

### 4. "Content Marketing for Lead Generation: What Works in 2026"
- **Original**: /blog/content-marketing-for-lead-generation/
- **Why**: Meta-relevant (content about content marketing). Strong data. Appeals to marketers and business owners -- a large audience on Medium.
- **Dev.to tags**: `marketing`, `productivity`, `smallbusiness`, `content`
- **Medium tags**: Content Marketing, Lead Generation, Marketing Strategy, Small Business, Digital Marketing

### 5. "How to Build an Email List From Scratch (The Non-Spammy Way)"
- **Original**: /blog/build-email-list-from-scratch/
- **Why**: Great hook/title. Personal story (food truck). Relatable for anyone starting out. Strong Medium vibes.
- **Dev.to tags**: `email`, `marketing`, `smallbusiness`, `beginners`
- **Medium tags**: Email Marketing, Entrepreneurship, Small Business, List Building, Marketing

## Reformatting Checklist (per post, per platform)

### Dev.to
- [ ] Add frontmatter: `canonical_url: https://brothersautomate.com/blog/[slug]/`
- [ ] Check all internal links point to brothersautomate.com (use full URLs, not relative paths)
- [ ] Add cover image (Dev.to displays it prominently)
- [ ] Add bio at bottom: "James Pinder is co-founder of Brothers Automate, where we build AI automation systems for service businesses. Originally published at brothersautomate.com."
- [ ] Verify markdown renders correctly (Dev.to uses standard markdown)

### Medium
- [ ] Use "Import a story" with the canonical URL (don't paste manually -- this auto-sets canonical)
- [ ] After import, check formatting (headers, bold, links all transferred correctly)
- [ ] Add 5 relevant tags
- [ ] Add a bio blurb at the top or bottom with link back to brothersautomate.com
- [ ] If submitting to a publication, follow their submission guidelines

### LinkedIn
- [ ] Condense to ~60% of original length (cut the deep-dive sections, keep the openers and key takeaways)
- [ ] Rewrite intro to hook LinkedIn's audience (lead with a provocative stat or question)
- [ ] Add engagement CTA at bottom ("What would you automate first? Drop a comment.")
- [ ] Remove all internal links to brothersautomate.com blog (LinkedIn deprioritizes posts with external links -- put the website link in the first comment instead)
- [ ] Add 3 relevant hashtags: #SmallBusiness #AIAutomation #MarketingAutomation

## Timing

- Syndicate each post **at least 2 weeks after** the original publishes on brothersautomate.com. This gives Google time to index the original first.
- Space syndicated posts 3-5 days apart across platforms. Don't dump all 5 on the same day.
- Best posting times:
  - Dev.to: Tuesday-Thursday, early morning EST
  - Medium: Tuesday-Thursday, 8-10am EST
  - LinkedIn: Tuesday-Wednesday, 7-9am or 12-1pm EST

## Tracking

After each post is syndicated, update backlink-tracker.json or keep a simple log:

| Post | Dev.to URL | Medium URL | LinkedIn URL | Date Syndicated |
|------|-----------|------------|--------------|-----------------|
| marketing-automation-ai | | | | |
| email-marketing-automation | | | | |
| email-automation-tools | | | | |
| content-marketing-for-lead-generation | | | | |
| build-email-list-from-scratch | | | | |
