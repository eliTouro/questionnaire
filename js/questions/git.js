export default [
  {
    q: "What does the command git add file.txt do?",
    options: [
      "Records file.txt permanently in the repository history",
      "Copies the current state of file.txt into the staging area",
      "Uploads file.txt to the remote repository",
      "Creates a new empty file named file.txt in the repository"
    ],
    answer: 1,
    why: [
      "Recording in history is what git commit does; git add only prepares content for the next commit.",
      "Correct: git add snapshots the file's current contents into the index (staging area), ready to be included in the next commit.",
      "Contacting a remote is the job of git push; git add is purely local.",
      "git add does not create files; it stages a file that already exists in the working directory."
    ]
  },
  {
    q: "What does git clone <url> do?",
    options: [
      "Downloads only the latest commit's files with no history or remote link",
      "Creates a new branch on the remote that copies your current branch",
      "Merges the remote repository into whichever repository is in the current folder",
      "Copies the repository with its full history and sets up a remote named origin"
    ],
    answer: 3,
    why: [
      "That describes a shallow download or an archive; a normal clone fetches the full history and keeps the link to the remote.",
      "Cloning does not create branches on the remote; it creates a local copy from it.",
      "Merging into an existing repo is done with fetch/pull; clone creates a brand-new local repository.",
      "Correct: clone downloads all objects and refs, creates a local repo, names the source remote origin, and checks out the default branch."
    ]
  },
  {
    q: "Which command shows the changes in your working directory that have NOT yet been staged?",
    options: [
      "git diff",
      "git diff --staged",
      "git log -p",
      "git show"
    ],
    answer: 0,
    why: [
      "Correct: plain git diff compares the working directory to the staging area, so it shows unstaged modifications.",
      "git diff --staged (or --cached) shows the opposite: what is staged compared to the last commit.",
      "git log -p shows the patches of past commits, not pending working-directory edits.",
      "git show displays a specific commit (by default HEAD), not uncommitted changes."
    ]
  },
  {
    q: "A file config.env is already tracked by Git. You now add config.env to .gitignore. What happens?",
    options: [
      "Git immediately deletes the file from the repository history",
      "Git deletes the file from your working directory on the next commit",
      "Git keeps tracking it; you must run git rm --cached config.env to stop tracking",
      "Git stops tracking it automatically and shows it as untracked"
    ],
    answer: 2,
    why: [
      "Git never rewrites history because of .gitignore; past commits still contain the file.",
      "The working-directory copy is not touched by .gitignore; it would only be removed by an explicit git rm.",
      "Correct: .gitignore only affects untracked files, so an already-tracked file stays tracked until you remove it from the index with git rm --cached.",
      "Tracked files are not automatically untracked; ignore rules are only consulted for files Git does not yet track."
    ]
  },
  {
    q: "How does git pull relate to git fetch?",
    options: [
      "git pull only downloads data, while git fetch also updates your files",
      "git pull is git fetch followed by a merge (or rebase) into the current branch",
      "git pull pushes local commits, while git fetch only reads the remote",
      "They are identical; pull is just an alias for fetch"
    ],
    answer: 1,
    why: [
      "This is reversed: git fetch only downloads and updates remote-tracking branches, leaving your working files alone.",
      "Correct: git pull runs git fetch and then integrates the fetched commits into your current branch, by merge by default or rebase with --rebase.",
      "Neither command pushes; git push is the command that sends commits to a remote.",
      "They are different: pull additionally integrates the fetched changes, which can create merges or conflicts."
    ]
  },
  {
    q: "What is HEAD in Git?",
    options: [
      "A reference to the currently checked-out commit, usually via the current branch",
      "The very first commit ever made in the repository",
      "The newest commit on the remote repository",
      "The name of the default branch, always called main"
    ],
    answer: 0,
    why: [
      "Correct: HEAD points to what you currently have checked out, normally a branch name that in turn points to its latest commit.",
      "The first commit is the root commit; HEAD moves with every commit and checkout.",
      "The remote's latest commit is tracked by remote-tracking refs such as origin/main, not HEAD.",
      "The default branch name is a convention that varies; HEAD is a pointer, not a branch name."
    ]
  },
  {
    q: "What does a Git commit fundamentally store?",
    options: [
      "Only the lines that changed since the previous commit, as a diff",
      "A copy of the changed files together with a timestamp and nothing else",
      "A list of filenames that were edited, with the edits kept in the working directory",
      "A snapshot of the project tree plus metadata and a pointer to its parent commit(s)"
    ],
    answer: 3,
    why: [
      "Git conceptually stores snapshots; diffs are computed on demand, not stored as the commit's primary content.",
      "A commit also records author, message, and parent links; that parent link is what forms the history graph.",
      "Commits contain the content itself (via tree and blob objects), not just filenames.",
      "Correct: a commit references a full tree snapshot, includes author and message metadata, and points to parent commit(s), forming the history graph."
    ]
  },
  {
    q: "You run git branch feature while on main. What is the result?",
    options: [
      "A new branch is created and you are switched to it",
      "The feature branch is merged into main",
      "A new branch named feature is created, but you stay on main",
      "The remote repository receives a new branch named feature"
    ],
    answer: 2,
    why: [
      "Switching would require git switch feature, git checkout feature, or git checkout -b feature.",
      "Merging is done with git merge; git branch only creates, lists, or deletes branches.",
      "Correct: git branch <name> only creates a new pointer at the current commit; HEAD stays on your current branch.",
      "git branch is local; branches are only sent to a remote with git push."
    ]
  },
  {
    q: "You just committed and want to undo the commit but keep all its changes staged. Which command does this?",
    code: "git log --oneline\n# a1b2c3 Add login form   <- HEAD\n# 9f8e7d Initial commit",
    options: [
      "git reset --hard HEAD~1",
      "git reset --soft HEAD~1",
      "git reset --mixed HEAD~2",
      "git revert HEAD"
    ],
    answer: 1,
    why: [
      "--hard moves the branch back and also discards staged and working-directory changes, so the work would be lost.",
      "Correct: --soft moves the branch pointer back one commit but leaves the index and working directory untouched, so the changes remain staged.",
      "--mixed unstages changes (leaving them in the working directory), and HEAD~2 would also go back past the initial commit.",
      "git revert creates a new commit that undoes the changes; it does not remove the original commit or leave changes staged."
    ]
  },
  {
    q: "A bad commit has already been pushed to a shared branch. What is the safest way to undo its effect?",
    options: [
      "git revert <commit>, which adds a new commit that reverses it",
      "git reset --hard <commit>~1 followed by a normal git push",
      "Delete the .git folder and clone the repository again",
      "git commit --amend and then push as normal"
    ],
    answer: 0,
    why: [
      "Correct: revert preserves history by adding an inverse commit, so collaborators can pull it normally.",
      "Resetting rewrites history, and a normal push would be rejected; forcing it would disrupt everyone who already pulled the commit.",
      "Re-cloning does not change the shared remote history and does not undo anything for others.",
      "Amend only rewrites the latest local commit, which changes its hash and would require a forced push on a shared branch."
    ]
  },
  {
    q: "You staged notes.txt by mistake but want to keep your edits in the file. Which command unstages it?",
    options: [
      "git restore notes.txt",
      "git checkout -- notes.txt",
      "git restore --staged notes.txt",
      "git rm notes.txt"
    ],
    answer: 2,
    why: [
      "Plain git restore discards working-directory edits (restoring from the index), which would lose your changes.",
      "git checkout -- <file> also overwrites your working copy with the staged version, discarding edits.",
      "Correct: git restore --staged resets the index entry to HEAD while leaving your working-directory edits in place.",
      "git rm removes the file from tracking and the working directory, which is far more destructive."
    ]
  },
  {
    q: "You have an edited tracked file and a brand-new untracked file. What does running git stash do?",
    code: "git status --short\n#  M app.js\n# ?? scratch.txt\ngit stash",
    options: [
      "It stashes both files, since stash saves everything in the folder",
      "It stashes only scratch.txt, because new files take priority",
      "It fails with an error because untracked files are present",
      "It stashes the modification to app.js and leaves scratch.txt in place"
    ],
    answer: 3,
    why: [
      "By default untracked files are not included; you need -u or --include-untracked.",
      "Untracked files are skipped by default, so the stash would not contain scratch.txt.",
      "The command works fine; it just ignores untracked files unless told otherwise.",
      "Correct: by default git stash saves changes to tracked files (staged and unstaged) and leaves untracked files alone."
    ]
  },
  {
    q: "What is the key difference between merging and rebasing a feature branch onto main?",
    options: [
      "Rebase keeps history untouched, while merge rewrites all commits",
      "Rebase replays the feature commits on top of main as new commits, while merge keeps them and adds a merge commit",
      "Merge only works on remote branches, while rebase works only locally",
      "Rebase deletes the feature branch's commits permanently from the project"
    ],
    answer: 1,
    why: [
      "This is reversed: merge preserves existing commits, while rebase rewrites them with new hashes.",
      "Correct: rebase re-applies your commits onto a new base, producing new commits and a linear history; merge preserves the original commits and ties them together with a merge commit.",
      "Both commands work on local branches; the remote is irrelevant to the choice.",
      "Rebase does not delete the changes; it re-applies them as new commits (the old ones remain reachable via reflog for a while)."
    ]
  },
  {
    q: "main has not moved since you branched off it, and you run git merge feature while on main. What typically happens?",
    options: [
      "A fast-forward: main simply moves to feature's tip with no merge commit",
      "Git always creates a merge commit with two parents",
      "The merge fails because the two branches have no common ancestor",
      "Git rebases feature onto main and deletes feature"
    ],
    answer: 0,
    why: [
      "Correct: when the current branch is a direct ancestor of the one being merged, Git just advances the branch pointer (fast-forward) unless --no-ff is given.",
      "A merge commit is only needed when both branches have diverged, or when --no-ff is used.",
      "They do share a common ancestor; in fact main's tip is that ancestor.",
      "Merge never rebases or deletes branches on its own."
    ]
  },
  {
    q: "What does git cherry-pick abc123 do?",
    options: [
      "Moves the existing commit abc123 into the current branch without changing its hash",
      "Deletes commit abc123 from the branch where it currently lives",
      "Applies the changes introduced by abc123 as a new commit on the current branch",
      "Merges the entire branch that contains abc123 into the current branch"
    ],
    answer: 2,
    why: [
      "The new commit has a different parent, so it gets a different hash; commits are not moved.",
      "The original commit stays on its branch; cherry-pick only copies the change.",
      "Correct: cherry-pick takes the diff of the chosen commit and re-applies it as a brand-new commit on your current branch.",
      "It copies a single commit, not the whole branch history."
    ]
  },
  {
    q: "During a merge conflict, what does the section between <<<<<<< HEAD and ======= contain?",
    code: "<<<<<<< HEAD\ntimeout = 30\n=======\ntimeout = 60\n>>>>>>> feature",
    options: [
      "The version from the feature branch being merged in",
      "The common ancestor's version of those lines",
      "The remote repository's version of those lines",
      "The version from your current branch (HEAD), the one you merged into"
    ],
    answer: 3,
    why: [
      "The feature branch's version is the section after =======, ending at the >>>>>>> feature marker.",
      "The ancestor version only appears with diff3 conflict style, in its own section; it is not the default.",
      "A merge conflict compares two local commits; the remote is not part of the marker layout.",
      "Correct: the first section is your current branch (HEAD), and the second is the incoming branch. You edit the file, remove the markers, git add it, then commit."
    ]
  },
  {
    q: "Why is git push --force-with-lease generally preferred over git push --force?",
    options: [
      "It refuses to overwrite the remote branch if someone else pushed commits you have not seen",
      "It merges remote commits into your branch before pushing",
      "It pushes to every remote at once without prompting",
      "It rewrites remote history without needing permission"
    ],
    answer: 0,
    why: [
      "Correct: --force-with-lease checks that the remote ref is still where you last saw it, so it will not silently destroy someone else's new commits.",
      "It does not merge anything; it only adds a safety check before an overwriting push.",
      "It targets the specified remote and branch only; it does not push to all remotes.",
      "Server-side permissions still apply; the option adds safety and does not bypass any access rules."
    ]
  },
  {
    q: "You run git checkout a1b2c3d (a commit hash) and then make a new commit. What is the risk?",
    options: [
      "Git blocks commits in this state, so the new commit is rejected",
      "You are in detached HEAD, so the new commit is not on any branch and can be lost unless you create a branch",
      "The commit is automatically added to the main branch",
      "The original commit a1b2c3d is overwritten by your new commit"
    ],
    answer: 1,
    why: [
      "Commits are allowed in detached HEAD; Git only warns you about the state.",
      "Correct: with a detached HEAD no branch advances, so the new commit becomes unreachable once you switch away; running git switch -c <name> saves it.",
      "Nothing is attached to main; no branch pointer moves.",
      "Commits are immutable; the new commit is simply a child of a1b2c3d."
    ]
  },
  {
    q: "Why is it considered unsafe to rebase commits that have already been pushed to a shared branch?",
    options: [
      "Rebase can only be run after you delete the remote branch",
      "Rebase always produces merge conflicts on shared branches",
      "Rebase rewrites those commits with new hashes, so collaborators' histories diverge from yours",
      "Rebase silently discards the commit messages of pushed commits"
    ],
    answer: 2,
    why: [
      "Rebase has no such requirement; the problem arises when you then force-push the rewritten history.",
      "Conflicts are possible with any integration but are not guaranteed; they are not the reason for the rule.",
      "Correct: rebased commits are new objects, so anyone who based work on the originals now has duplicate or divergent history that is painful to reconcile.",
      "Messages are preserved by default; the issue is changed commit identities, not lost text."
    ]
  },
  {
    q: "You ran git reset --hard HEAD~3 and now realize you lost three commits. What is the best way to get them back?",
    options: [
      "They are permanently gone once reset --hard has run",
      "Run git fetch, which restores deleted local commits",
      "Run git stash pop to restore the commits",
      "Find them with git reflog and run git reset --hard <hash> to return there"
    ],
    answer: 3,
    why: [
      "The commit objects remain in the repository for a while (until garbage collection), and the reflog still references them.",
      "Fetch retrieves remote data; it does not restore commits that were only local.",
      "Stash holds uncommitted work and does not contain the commits that reset moved away from.",
      "Correct: the reflog records previous positions of HEAD, so you can find the old tip's hash and reset or branch back to it."
    ]
  },
  {
    q: "A three-way merge uses which three commits to combine two branches?",
    options: [
      "The two branch tips and their most recent common ancestor (merge base)",
      "The two branch tips and the root commit of the repository",
      "The two branch tips and the latest commit on the remote",
      "Three consecutive commits from the branch being merged in"
    ],
    answer: 0,
    why: [
      "Correct: Git diffs each tip against the merge base; changes made on only one side are taken, and overlapping edits to the same lines produce conflicts.",
      "The root commit is not used; the nearest shared ancestor gives a far more precise comparison.",
      "The remote is not involved in a local merge computation.",
      "The three inputs are tips and a common ancestor, not consecutive commits from one branch."
    ]
  },
  {
    q: "Given this history, what does the command do?",
    code: "# main:     A---B\n#                \\\n# featureA:       C---D\n#                      \\\n# featureB:               E---F\ngit rebase --onto main featureA featureB",
    options: [
      "It moves D, E and F onto main",
      "It replays only E and F (the commits in featureA..featureB) on top of main",
      "It merges featureA and featureB into main",
      "It deletes featureA and moves featureB to point at main"
    ],
    answer: 1,
    why: [
      "D belongs to featureA, which is the excluded upstream here, so D is not replayed.",
      "Correct: with --onto <newbase> <upstream> <branch>, Git replays the commits reachable from featureB but not from featureA (E and F) onto main.",
      "Rebase never creates a merge commit or updates main; it moves commits of featureB.",
      "featureA is not deleted or changed; only featureB is rewritten."
    ]
  },
  {
    q: "You need to revert a merge commit M. Why does git revert M fail without extra options?",
    options: [
      "Merge commits cannot be reverted under any circumstances",
      "Git requires the branch to be deleted first",
      "A merge has multiple parents, so you must pick the mainline with -m (for example -m 1)",
      "Reverting a merge requires a forced push to the remote"
    ],
    answer: 2,
    why: [
      "They can be reverted; you just need to specify which side to treat as the mainline.",
      "Branch deletion has no bearing on revert.",
      "Correct: since a merge has two parents, Git cannot tell which side to restore; -m 1 means keep the first parent (usually the branch you merged into).",
      "Revert creates a new commit, which pushes normally; no force is needed."
    ]
  },
  {
    q: "What does this command sequence do?",
    code: "git bisect start\ngit bisect bad\ngit bisect good v1.0\n# test, then mark each commit good/bad",
    options: [
      "It splits the current branch into two equal branches",
      "It checks every commit one by one from v1.0 forward",
      "It deletes all commits marked bad from the history",
      "It binary-searches between v1.0 and HEAD to find the commit that introduced a bug"
    ],
    answer: 3,
    why: [
      "Bisect does not split branches; it checks out commits for testing.",
      "Bisect does not walk linearly; it halves the range each step, needing roughly log2(n) checks.",
      "Marking commits only labels them for the search; no history is deleted.",
      "Correct: bisect checks out the midpoint of the range, you mark it good or bad, and the range halves each time until the first bad commit is found."
    ]
  },
  {
    q: "After git merge --squash feature and git commit on main, why does git branch -d feature refuse to delete the branch?",
    options: [
      "The squashed commit has no parent link to feature, so Git does not see it as merged",
      "Squash merges leave the branch locked until you push",
      "Squash merges automatically convert feature into a remote branch",
      "The squash commit is stored only in the staging area"
    ],
    answer: 0,
    why: [
      "Correct: a squash creates one ordinary single-parent commit, so feature's commits are not ancestors of main and -d warns they are unmerged (use -D after you verify).",
      "There is no locking mechanism involved; the check is based on commit ancestry.",
      "Branches are never converted to remote branches by merging.",
      "The squash result is a normal commit once you run git commit; it is not left in the staging area."
    ]
  }
]
