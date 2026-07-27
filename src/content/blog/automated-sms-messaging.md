---
title: "Automated SMS Messaging: What to Send and When"
description: "Automated SMS messaging done right: which triggers to build, what to send, and how to stay TCPA and 10DLC compliant without hiring a developer or agency."
date: 2026-07-27
category: "Customer Service Automation"
author: "Brothers Automate"
tags: ["SMS automation", "customer service automation", "appointment reminders", "small business automation", "TCPA compliance", "text messaging"]
---

Your scheduling software already knows tomorrow's job is at 9am. Your invoicing tool already knows that $840 payment is eleven days late. Your phone system already knows somebody called at 2:14pm and nobody picked up.

None of them are going to text anybody about it.

That's the actual problem with automated SMS messaging, and it's the one nobody on page one of Google is solving. Sending a text is solved. It costs a fraction of a penny and there are a dozen platforms that will do it for you. What's missing is the layer that decides *when* a text should fire, based on something that really happened in your business.

We build that layer for service businesses. So here's the guide we wish existed when we started: what to send, what should trigger it, and the two compliance requirements that will stop your messages cold if you skip them.

Fair warning on that last part. It's the least fun section and the most important one.

## What automated SMS messaging actually is

Automated SMS messaging is software that sends text messages on its own, without anyone typing them, based on a schedule, an event in one of your systems, or an inbound keyword from the customer.

Three different mechanisms hide under that one phrase, and mixing them up is why people buy the wrong tool.

**Scheduled sends** go out at a set time relative to something on a calendar. A reminder 24 hours before an appointment. A seasonal maintenance notice on the first Monday in October. You set the timing; the clock does the rest.

**Triggered sends** fire when a record changes state somewhere in your stack. A job gets marked complete and a review request goes out. A quote sits unopened for nine days and a follow-up fires. Nothing about the calendar matters here. Something happened, so a message went.

**Keyword auto-replies** respond to what the customer texts you. Somebody texts HOURS and gets your hours back in two seconds. Somebody texts QUOTE and gets a link to your intake form.

One more distinction worth drawing, because the vendor pages blur it badly: automated SMS is not the same thing as SMS marketing. Marketing is one use case. For most service businesses the money is in the operational messages — reminders, status updates, follow-ups, and confirmations. Those are the texts customers actually want, and they carry different consent rules than a promotional blast. More on that below.

## Why texting works when email doesn't

The vendor stat everybody quotes is that SMS open rates run 90 to 98 percent versus 20 to 30 percent for email, [per OptiMonk's roundup of SMS marketing data](https://www.optimonk.com/sms-marketing-statistics). Take it for what it is — a marketing company's number about marketing channels. We're only going to use it once.

Here's better evidence. A [randomized controlled trial at an urban pediatric clinic](https://pmc.ncbi.nlm.nih.gov/articles/PMC5227159/) split 169 patients into two groups. Everyone got the standard voice reminder. Half also got a text. The no-show rate came in at 23.5 percent for the text group against 38.1 percent for voice-only — a 14.6 point difference, statistically significant at p = 0.04.

That's a real study with a control group, not a vendor infographic. And it points at something more useful than an open rate.

Texting doesn't work because people open texts. It works because the message arrives at the moment the decision gets made. Somebody deciding whether to show up tomorrow morning is holding their phone. Somebody deciding whether to pay your invoice or your competitor's is holding their phone. Email waits in a queue for a moment that may never come. A text lands inside the moment.

That's the whole mechanism. Everything else in this article is about getting the timing right.

## The eight automated texts worth building first

Most guides on this topic list welcome series and shipping notifications, which tells you they were written for Shopify stores. If you run a contracting business, a clinic, a studio, or a coaching practice, here's the order we'd actually build them in.

**1. Missed-call text-back.** Trigger: your phone system logs an unanswered inbound call. Timing: inside 60 seconds. What it replaces: you, remembering to call back four hours later. This one gets its own section below.

**2. Appointment reminder at 24 hours and 2 hours.** Trigger: a confirmed booking on the calendar. Timing: two sends, not one — the 24-hour message lets people reschedule instead of ghosting, and the 2-hour message catches the ones who forgot.

> Reminder: Ridgeline Plumbing is scheduled at your place tomorrow, Tue 7/28, 9-11am. Reply C to confirm or R to reschedule.

The reminder is downstream of your calendar, so it only works as well as your [appointment scheduling automation](/blog/appointment-scheduling-automation) does. Garbage bookings in, garbage reminders out.

**3. On-my-way / tech en route.** Trigger: your tech taps "start travel" in the field app. Timing: immediately.

> Dave is on his way — ETA about 20 minutes. Silver van, Ridgeline Plumbing on the side.

What it replaces: the customer calling your office to ask where the tech is. If you're running a crew, this trigger usually already exists inside your [field service management software](/blog/field-service-management-software) and nobody has turned it on.

**4. Quote or estimate follow-up.** Trigger: quote sent, no response after a set number of days. Timing: day 3, and once more around day 10.

> Hi Jenna — following up on the water heater quote we sent Friday. Any questions, or want me to hold that install slot for next week?

A text follow-up and a [follow-up email after a sales call](/blog/follow-up-email-after-sales-call) do different jobs. The email carries the detail and the attachment. The text gets read. Send both, and put the actual question in the text.

**5. Review request after job completion.** Trigger: job marked complete, or invoice marked paid. Timing: two to four hours after, not the next morning.

> Thanks for having us out today. If we did right by you, a quick Google review helps us a ton: [link]

Our opinion: this is the most underrated automation on the list. Not because reviews are magic, but because the window where somebody feels good about your work is measured in hours. Ask on Tuesday for Monday's job and you've already missed it.

**6. Invoice or payment reminder.** Trigger: invoice due date approaching, then passing.

> Hi Jenna — invoice #4412 for $840 is due Friday. You can pay here: [link]. Reply if you'd rather split it.

What it replaces: the awkward phone call you keep not making. That "reply if you'd rather split it" line does a lot of work. It turns a demand into a conversation.

**7. Rebook or reorder nudge.** Trigger: N days since last service, where N is your actual service interval.

> It's been about six months since your last tune-up. Want me to grab you a slot before the fall rush? Reply YES and I'll send times.

**8. After-hours auto-reply.** Trigger: inbound text outside business hours.

> Thanks for texting Ridgeline Plumbing. We're closed until 7am. Emergency? Call 555-0143. Otherwise we'll reply first thing.

Costs you nothing and stops people from assuming you went out of business.

Build these in order. Stop when you hit the point of diminishing returns for your business, which for a lot of small operations is somewhere around number four.

### The missed-call text-back, in detail

If you answer a phone for a living, build this one first. We mean that literally — the first thing we wire up for a contractor client is almost always the missed-call text-back, and it's usually live before anything else in the stack.

Here's the mechanic. Your phone system records a missed call. That event, by itself, does nothing. It sits in a log. The system that reads that log and sends a text within 60 seconds is the one that turns a lost call into a job.

We ran a food truck for four and a half years, and the phone rang plenty while both our hands were busy. Nobody is texting anybody back mid-rush. That's the whole point of putting a machine on it.

A word on the statistics floating around this topic. Every vendor page cites a different number for how many callers go to a competitor instead of waiting — we found 62 percent, 75 percent, and 85 percent on three different sites, none of them sourced. Ignore the numbers. The behavior is obviously real and you don't need a statistic to know that somebody with a leaking pipe calls the next plumber on the list.

Two things matter more than speed:

Ask a real question. "Sorry we missed your call, we'll get back to you soon" is a dead end. "Sorry we missed you — what's going on and what's your address? I can text you a window today" starts a conversation and qualifies the lead in one message.

Identify yourself in the first sentence. An unknown number texting somebody who called 40 seconds ago reads as spam unless your business name is right there.

On consent: an inbound call from a prospect is a completely different posture than a purchased list. Somebody who dialed your number and let it ring has clearly initiated contact with your business, and a single operational reply to that call is not a marketing blast. Adding them to a promotional list afterward is a different question entirely, and the answer is usually no unless they opted in.

If you'd rather the call get answered than texted back, that's a different build — see our writeup on using an [AI receptionist](/blog/ai-receptionist-for-small-business) to pick up instead of routing to voicemail.

## Triggers: what actually fires the message

Every page ranking for this keyword sells you the ability to send. Almost none of them explain what does the deciding. That gap is the whole ballgame, so let's break it down.

Triggers come in three flavors, and knowing which one you need tells you what to buy.

**Time-based triggers** run off a scheduled event. X hours before an appointment, Y days after a service date, the first of the month. These are the easiest to build and every texting platform on the market handles them.

**Event-based triggers** fire when a record changes state. Quote status moves from "sent" to nothing for nine days. Job moves to "complete." Invoice moves to "overdue." These live in your CRM, your scheduler, or your invoicing tool, and getting at them is where most people stall out. This is the domain of [CRM automation](/blog/crm-automation-small-business) more than it is texting software.

**Behavior-based triggers** respond to the customer. They replied. They clicked the quote link twice in an hour. They've gone quiet for 45 days after being active weekly.

Now the point. Your scheduler already knows tomorrow's appointment exists. Your CRM already knows the quote went out nine days ago and nobody opened it. Your invoicing tool already knows the payment is late. Every trigger listed above is sitting in a database you're already paying for.

Nothing is acting on it.

That's the gap, and it's not a data problem. Buying another texting inbox does not fix it, because the inbox doesn't know your quote is stale. The job is wiring the trigger — connecting the system that knows to the system that sends.

Once you see it that way, the build order gets obvious. Figure out which system holds the event you care about. Then figure out how to read it. The sending part takes about ten minutes.

## Before you send a single text: 10DLC and TCPA

Quick note: we build automation, we're not lawyers, and none of this is legal advice. If you're sending at any real volume, have someone qualified look at your consent language. What follows is the practical version.

There are two separate requirements here and people conflate them constantly.

**10DLC determines whether your message gets delivered.** **TCPA determines whether you were allowed to send it.** You can be perfectly compliant with one and blocked or sued under the other.

### 10DLC registration

If you're sending application-to-person texts from a regular 10-digit US number, you have to register. Two steps: a brand registration for your business, and a campaign registration describing what you'll send and how people opted in. Both go through [The Campaign Registry](https://www.campaignregistry.com/), which the mobile carriers created for exactly this purpose. You don't go there directly — you submit through whatever provider you're using, like Twilio, Bandwidth, Telnyx, or Vonage.

As of February 1, 2025, the major US carriers stopped delivering unregistered A2P traffic. Not throttled. Not filtered into spam. Blocked. Every provider's documentation now says the same thing, and it means an unregistered small business literally cannot run any of the eight automations above.

Rough numbers, which change often enough that you should confirm with your provider: brand registration runs a few dollars for a sole proprietor and somewhere north of $45 for a standard business, plus roughly $15 per campaign. If you don't have an EIN there's a sole proprietor path — ask your provider about it before you assume you're locked out.

Approval takes a few business days for the brand and up to a week or two for the campaign. Start it before you need it.

### TCPA consent

The Telephone Consumer Protection Act governs whether you had permission. For marketing texts, you generally need prior express written consent captured before you send — a checkbox that isn't pre-ticked, clear language about what they're signing up for, and a note that consent isn't a condition of purchase.

Damages are $500 per message, tripled to $1,500 if a court finds the violation was willful, with no class-action cap. That math gets ugly fast on a list of any size.

Opt-out handling got stricter recently. Under the FCC's [consent revocation order](https://docs.fcc.gov/public/attachments/FCC-24-24A1.pdf), effective April 11, 2025, a customer can revoke consent in any reasonable manner. You can't force one specific keyword. STOP works, and so do QUIT, END, REVOKE, CANCEL, OPT OUT, and UNSUBSCRIBE. You get 10 business days to honor it.

Practical takeaway: log your consent with a timestamp and the exact language the person saw, honor opt-outs automatically instead of manually, and keep operational messages separate from promotional ones in your system. That last one saves you the most grief.

## How to actually build it

Two paths, and the right answer depends entirely on whether your hard part is sending or triggering.

**Path A: an all-in-one texting platform.** SimpleTexting, EZ Texting, Textedly, and SlickText all do scheduled sends, keyword auto-replies, and basic list management out of the box. Roughly $25 to $50 a month at small volume. They handle 10DLC registration for you, which is worth real money in saved headaches.

Pick this if you mostly need scheduled reminders and keyword replies. It'll be running by Thursday.

Honest limitation: you'll hit a ceiling, and you'll hit it around automation number four on our list. These platforms are excellent at sending and weak at reading state out of your other systems. The moment you want "if the quote is nine days old AND the customer hasn't replied AND the job value is over $2,000, then text the owner instead of the customer," you've outgrown it.

**Path B: a workflow builder between your systems and a messaging API.** This is what we build for clients, because the trigger logic is almost always the hard part.

We use Gumloop for this. It sits between your CRM, scheduler, or invoicing tool and a messaging API, and it handles the conditional branching that the all-in-one platforms won't. You may know Zapier or Make from the "connect your apps" world, and they're fine for simple one-to-one connections. For real workflow automation — branching logic, data enrichment, AI steps that read a message and decide how to route it — Gumloop is what we reach for. For anything custom on top, we build with Claude Code.

If you're weighing options here, we wrote a longer comparison of [workflow automation platforms](/blog/workflow-automation-platforms) that goes deeper than we can here.

Cost for path B lands roughly $50 to $150 a month in tooling, plus about half a cent per message. The build is where the time goes, not the running.

Our opinion, stated plainly: most service businesses are sold path A when they need path B, because path A is what's advertised. If your entire need is "text everyone on my calendar tomorrow morning," take path A and don't overthink it. If your need has the word "when" in it anywhere, you need something that can evaluate a condition.

## Writing texts people don't opt out of

You have about one sentence before somebody decides whether you're worth keeping.

Identify yourself first. Every single time in the first message of a thread. Your customer doesn't have your number saved.

One idea per text. If your message has two asks in it, you'll get zero answers.

Stay under 160 characters when you can. Not because of segment costs — those are pennies — but because a wall of text on a phone screen reads as an ad.

Ask a question when you want a reply. Give an instruction when you don't. Mixing them produces confused customers who do neither.

Never send two automated messages for one event. If the job completion fires both a review request and a rebook nudge, you've just texted somebody twice in five minutes and they're gone.

Here's a rewrite to make it concrete.

Before:

> Hi {{first_name}}! We hope you're LOVING your new HVAC system!! Don't forget we also offer duct cleaning, water heater service, and annual maintenance plans. Reply for a FREE quote today!!

After:

> Hi Jenna — Dave from Ridgeline. How's the new system running? If anything sounds off in the first two weeks, that's on us to fix.

The second one is shorter, sounds like a person, and will get replies. The first one gets STOP, and it deserves it.

Frequency guardrail: the fastest way to torch a list is three texts in one week. One message per real event. If the customer wouldn't have noticed the event happened, don't text about it.

## What to measure

Five numbers. Track these and skip everything else your dashboard offers.

**Delivery rate.** If this drops below roughly 95 percent, you have a 10DLC or carrier filtering problem, not a copy problem. It's the first place to look when things go quiet.

**Reply rate.** Only matters on the messages where you asked a question. A reminder with a 2 percent reply rate is fine. A missed-call text-back with a 2 percent reply rate is broken.

**Opt-out rate, per campaign.** This is your early-warning system. Anything above about 2 percent on a single campaign means the message, the frequency, or the list is wrong. Well-run programs sit well under that. Watch it per campaign, not blended, or a bad send will hide inside a good average.

**The operational outcome the automation exists to move.** No-show rate for reminders. Review count for review requests. Average days-to-payment for invoice nudges. This is the only number that tells you whether the thing was worth building.

**Cost per message against that outcome.** If your reminder automation costs $40 a month and recovers two no-shows, the math is not close. Run it once.

The trap is measuring send volume. Send volume goes up whether the automation is working or not, and it's the metric every platform puts on the front of the dashboard. It tells you nothing.

If you build one thing this month, build the missed-call text-back and instrument it properly. It has the shortest path from event to money, and it'll teach you more about your own trigger data than any of the others.

## Frequently asked questions

### Can I send automated text messages for free?

Free tiers exist and they cap out fast, usually somewhere between 50 and 500 messages a month. But cost isn't the real gate. None of the free options exempt you from 10DLC registration, and registration has fees attached regardless of what your sending platform charges. Budget for compliance before you budget for volume.

### Do I need 10DLC registration to send automated texts?

Yes, for application-to-person traffic sent to US numbers from a 10-digit long code. Since February 2025, carriers block unregistered traffic outright rather than filtering it. Toll-free and short code numbers have their own verification requirements. There is no version of this where you skip registration and messages still arrive.

### Can I automate texts from my iPhone or Android instead?

For a personal "driving, will text back later" auto-reply, sure. For a business, no. You get no consent records, no automatic opt-out handling, no delivery reporting, and no way to prove compliance if somebody complains. Carrier filtering also catches person-to-person numbers sending automated patterns eventually, and when it does you lose the number.

### What's the difference between automated SMS and SMS marketing?

Automated SMS is the delivery mechanism. SMS marketing is one thing you can do with it. Operational messages — reminders, status updates, appointment confirmations, auto-replies — are a different category from promotional sends and carry different consent expectations. Keep them separate in your system, and never quietly move an operational contact onto a marketing list.

### How many automated texts is too many?

Rule of thumb: one message per real event, and if the customer wouldn't have noticed the event happened, don't text about it. Nobody needs a text because their record was updated in your CRM. Your opt-out rate is the signal — if it climbs past 2 percent on a campaign, you're sending too often or sending the wrong thing.
