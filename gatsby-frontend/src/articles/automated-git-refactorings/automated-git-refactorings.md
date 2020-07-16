---
title: "How to apply automated refactorings to a large Git branch tree"
date: "2017-08-27"
draft: false
author: Matthew DeKrey
tags:
  - git
  - refactoring
source: https://medium.com/@matt.dekrey/how-to-apply-automated-refactorings-to-a-large-git-branch-tree-fccb65452904
---

Recently, my team decided to implement [Prettier](https://github.com/prettier/prettier) on our TypeScript code base. When we started our greenfield project more than a year ago, we started with a core team of CoffeeScript and Ruby developers plus me as architect and TypeScript specialist. While we needed the maintainability benefits that you get from a strongly-typed language like TypeScript, the core team balked at all the stylistic changes, especially the addition of semicolons. Picking my battles, I agreed to adopt their style. Fast-forward to now when we have mostly people from C-like backgrounds on the team... there's been some stylistic shifts. Rather than continuing to have the fight back-and-forth over the little things, we decided Prettier out-of-the-box was the way to go.

Unfortunately, our code base has grown considerably. With over 100,000 lines of TypeScript spread across 1,200 files (and more SCSS files exceeding 30,000 lines of code), it was looking like a massive chore. A few of us have been developing for quite some time, so we knew we didn't want to deal with the merge conflicts that could come from implementing this kind of change. With launch day right around the corner, we didn't have the time to stop work in progress so a `master` branch could be updated and new work could start from there. Our plan to get our coding style under control seemed DOA.

<figure>
<img src="./L8V0he9CqczlGIhu.jpg" alt="Lord Eddard Stark looking dramatic with caption: Brace yourself, merge conflicts are coming." />
<figcaption>
What all of our senior developers were saying as we continued to move forward...
</figcaption>
</figure>

_Note: Make sure your auto-refactor is completely idempotent. (That is, you can run it several times and you'll get the same result.) The version of Prettier that we used didn't get every file to 100% the final state in a single run, though got fairly close. Fortunately, it was in an untouched corner of our code base where we saw this happen, so it didn't bite us with difficult merge conflicts._

The Solution
============

After a few weeks of experimentation, we found a relatively simple process to remove the potential for any merge conflicts due to the refactor.

1.  Get the latest
2.  Merge the changes from before the refactor
3.  Merge the changes for the refactor, but ignore them
4.  Run the auto-refactor
5.  Resume merging as normal

But, you probably came here for code:

```sh
git fetch # repeat for each "upstream" branch
git merge {commit-before-auto-refactoring}
# normal, non-refactoring conflicts may occur!
git commit # repeat for each "upstream" branch
git merge {commit-immediately-after-auto-refactoring} -s ours
# run your auto-refactor script and commit it
./auto-refactor
git add .
git commit -m Auto-refactor # repeat for each "upstream" branch
git merge {branch-name}
# normal conflicts may occur!
```

This uses the concept of [upstream branches from the Scaled Git Process](/articles/scaled-git-flow/), but can work with any branching model. In brief, an upstream branch is one that you plan on merging into a given branch. Don't leave out _any_ upstream branches when you do this; you'll have the conflicts you were trying to avoid in the first place.

If you have only one upstream branch that most developers are using, such as `develop` from GitFlow that merges into all branches, and aren't using any more advanced techniques than that, you can get away with tagging the specific commits in question. Let's break this down.

_Side note: GitFlow can get messy due to the two-way data flow between develop and the feature branches. It's why I developed the_ [_Scaled Git Process_](/articles/scaled-git-flow/) _in the first place._

Make sure you have the latest
-----------------------------

```sh
git fetch
```

Yes, it starts out familiar. This is pretty common when you want to merge something into your branch. (I assume you have the latest in your branch, too; you'll want other developers to stop working _on this branch_ while this is in progress. Don't worry; it doesn't take long.)

Merge the changes from before the auto-refactor
-----------------------------------------------

```sh
# repeat for each "upstream" branch
git merge {commit-before-auto-refactoring}
# normal, non-refactoring conflicts may occur!
git commit
```

It's really important to make sure all your conflicts are resolved and your code is working first! Otherwise, you'll end up with conflicts on your fix to the merge. Run unit tests, make sure your app launches, whatever you normally do to make sure you can sleep at night before pushing your code to the main repository. For most of our developers based off of our last service line release, this was as simple as:

```sh
git merge 9d3a024
```

_Note: This is actually where we made a mistake on a few of our branches. We accidentally used the commit-hash from the original branch where this work was done than the branch-specific upstream branch. Be very cautious when sharing the hashes around as this process requires precision._

After this step becomes your `commit-before-auto-refactoring` for other downstream branches, if you have them. I didn't show it above, but you can capture this value with:

```sh
git show-ref HEAD --hash
```

Merge changes for the auto-refactor, but ignore them
----------------------------------------------------

This is the tricky bit.

```sh
# repeat for each "upstream" branch
git merge {commit-immediately-after-auto-refactoring} -s ours
```

If you're unfamiliar with the `-s ours` option of git, that's completely understandable. Basically, this says "Claim in the branch that you've taken all of _that_ stuff, but throw it away." This is important; you'll have conflicts if you don't do this for every line you changed in this branch. That's exactly what we're trying to avoid!

(If you only have one upstream branch, you can be clever and squash this step and the next one. However, I don't recommend it.)

For our developers, this ended up being:

```sh
git merge df4f36c -s ours
```

Run the auto-refactor
---------------------

It's time to do your auto-refactor. We actually used an `npm` script, but that won't always apply.

```sh
# run your auto-refactor script and commit it
./auto-refactor
git add .
git commit -m Auto-refactor
```

It's helpful to always have the same commit message across branches so you can see what is going on, though yours may differ from the above, because the commit at this point becomes your `commit-immediately-after-auto-refactoring` for branches that are downstream of this one. Again, I didn't show it above, but you can capture this value with:

```sh
git show-ref HEAD --hash
```

Resume merging like normal
--------------------------

At this point, you can merge like you normally do; git will handle all the rest of the magic and you won't see conflicts!

```sh
# repeat for each "upstream" branch
git merge {branch-name}
# normal conflicts may occur!
```

That's it!
==========

If you enjoyed this article, please help others find it by hitting the clap button (or, if you really enjoyed it, hit-and-hold the clap button), post it to your company's Slack, tweet it, or however you want. Good luck and happy merging!
