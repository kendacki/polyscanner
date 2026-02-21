Auto-push watcher

This project includes `scripts/auto-push.ps1`, a PowerShell watcher that automatically stages, commits, and pushes changes to `origin/main`.

How to run

1. Open PowerShell in the workspace root (where `.git` is located).
2. Start the watcher (allow it to run while you work):

```powershell
# run once in the repo root
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\auto-push.ps1
```

3. The script debounces changes for a few seconds, then runs `git add -A`, `git commit -m "auto: <timestamp>"`, and `git push origin main`.

Notes and safety

- Commits are automatic and use a generic message. Consider adjusting commit policy if you want meaningful messages.
- The script will push to `origin/main`. Make sure `origin` and `main` are configured as you expect.
- Authentication: since you configured HTTPS credential helper earlier, pushes should use stored credentials or `gh` token.
- To stop the watcher, press Ctrl+C in the terminal running it.

Want a different behavior?
- I can change the branch, commit message format, or add an exclusion list for files to ignore.
- I can register a Windows scheduled task or run this as a background service instead.