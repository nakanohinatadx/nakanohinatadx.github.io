# nakanohinatadx.github.io

Static GitHub Pages site for Hinata.

## Development setup

Development now includes a second PC (new notebook). Set up GitHub SSH access separately on each PC: create a unique SSH key pair and add that PC's public key to the GitHub account. Keep the private key on its own PC.

Before editing on either PC, update the local `main` branch:

```bash
git switch main
git pull --ff-only origin main
```

The repository is [nakanohinatadx.github.io](https://github.com/nakanohinatadx/nakanohinatadx.github.io). Review `AGENTS.md` for project-specific development and verification guidance.
