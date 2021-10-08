---
title: "Conceptual Integrity"
date: 2021-10-06T18:25:57+02:00
draft: false
---

In 1975, [Fred Brooks](https://wiki.c2.com/?FredBrooks) said: I will contend that Conceptual Integrity is the most important consideration in system design. It is better to have a system omit certain anomalous features and improvements, but to reflect one set of design ideas, than to have one that contains many good but independent and uncoordinated ideas.

In 1995, Brooks still hasn't changed his mind: I am more convinced than ever. Conceptual Integrity is central to product quality. Having a system architect is the most important single step toward conceptual integrity...after teaching a software engineering laboratory more than 20 times, I came to insist that student teams as small as four people choose a manager, and a separate architect.

According to Fred Brooks, "Conceptual integrity in turn dictates that the design must proceed from one mind, or from a very small number of agreeing resonant minds". To me, a very small number would only mean the entire team only when that team is a very small number. In my opinion, ConceptualIntegrity is a required ingredient for achieving the principle (I think espoused by AlanKay?) that "a system must have a powerful metaphor that is uniformly applied throughout a system". While not enough on its own, the SystemMetaphor used by XP is a step towards achieving ConceptualIntegrity in that system.

Conceptual Integrity does not mean one shouldn't include many minds (or even the entire team for that matter) in the Analysis & Design process. This is a very important detail that shouldn't be discounted by those who wish to do away with the role of architect. Team input in Analysis and Design is absolutely essential for (1) establishing TeamGel, (2) ensuring the soundness and quality of the analysis, and (3) refactoring the design into something more polished. In fact, the earlier the architect or design-team can include the entire team (or domain-team leads for very large teams), the higher quality the design will be. The DesignTeam must be open to and accept criticism, the architect(s) must be egoless (see EgolessProgramming).

However, if there is no final word, no one-mind fighting off the democratic compromises that can reduce a vision to its lowest common denominator, then it will be difficult to achieve ConceptualIntegrity and the system may run the risk of becoming an AmorphousBlobOfHumanInsensitivity (due to TooManyCooksInTheKitchen). It is important to realize that you can be inclusive (or team-oriented) without being everyone-designs or anti-architect. Said another way, it is possible to have an architect and have team collaboration on a design at the same time.

It is also important to note that on a small team, the design-team may in fact be the whole product team. Another approach would have the architect role and the coach or technical/team lead role (i.e. the final say or tie-breaker) be filled by a single individual in order to ensure ConceptualIntegrity. As is mentioned in much of the RationalUnifiedProcess literature, there is no requirement for a 1 to 1 or even a 1 to N cardinality between roles and people. A single person could hold many roles just as a single role could be held by many people.

Can we identify specific, well-known examples of Conceptual Integrity? 

 * Unix (based on the notion of a "file" (e.g. directories, devices, filesystems, named pipes and sockets are all sort-of files)
 * Smalltalk ("everything is an object", and the small set of other accompanying principles)
 * SQL ("all data is in tables", with keys and constraints)
 * Lisp ("everything is a list")