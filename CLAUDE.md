# Claude Code Guidelines

## Pull Requests

- Always prefix PR/MR titles with `[Claude Code] `

## Environment Setup

### GitHub CLI (`gh`)

The `gh` CLI may not be installed by default. If `gh` is not found, install it with:

```bash
curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg 2>/dev/null \
  && echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | tee /etc/apt/sources.list.d/github-cli.list > /dev/null \
  && apt update && apt install gh -y
```

Do NOT use `npm install -g gh` — that installs a different, unrelated package.
