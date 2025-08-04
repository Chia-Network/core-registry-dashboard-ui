# Core Registry Dashboard User Interface

The Core Registry Dashboard is the best way for a registry to visualize a snapshot of its climate data and impact.
This user interface accesses data from [Core Registry CADT](https://github.com/Chia-Network/Core-Registry-CADT/)
and displays charts based on summary data statistics.

## Related Projects

* [Chia Blockchain](https://github.com/Chia-Network/chia-blockchain)
* [Climate Tokenization Engine](https://github.com/Chia-Network/Climate-Tokenization-Engine)
* [Climate Tokenization Engine UI](https://github.com/Chia-Network/Climate-Tokenization-Engine-UI)
* [Climate Explorer](https://github.com/Chia-Network/climate-token-driver)
* [Chia Climate Tokenization](https://github.com/Chia-Network/climate-token-driver)
* [Climate Wallet](https://github.com/Chia-Network/Climate-Wallet)
* [Climate Action Data Trust](https://github.com/Chia-Network/cadt)
* [Climate Action Data Trust UI](https://github.com/Chia-Network/cadt-ui)

## QuickStart

### Installation

The dashboard is only available as a web build, though building it locally as an electron application should be possible (although not routinely tested).

### Web Application

The Climate Dashboard can be hosted as a web application, either for internal use, or made available to the public.  When operating as a web application, the user's browser must be able to connect to the [Core Registry CADT API](https://github.com/Chia-Network/Core-Registry-CADT).  This means the API must be available on the public internet if the UI is public.

To host the UI on the web, use the [core-registry-dashboard-web-build.tar.gz file from the releases page](https://github.com/Chia-Network/core-registry-dashboard-ui/releases). One of the simplest solutions is to uncompress these files into a [public S3 bucket](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteAccessPermissionsReqd.html). These files could also be served by any webserver, such as Nginx or Apache.

#### Sample Nginx Config

```
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;

    # Path on disk to Tokenization Engine UI files
    root /var/www/dashboard-ui/build;

    # Domain name where this site will be served from
    server_name dashboard-ui-example-config.com;

    # SSL certificates with full path
    ssl_certificate /path/to/ssl/certificate/fullchain.pem;
    ssl_certificate_key /path/to/ssl/certificate/privkey.pem;

    # Optional, but recommended
    resolver                  1.1.1.1;

    try_files $uri /index.html;
}

```

#### Installing from Source

Install [Node 20](https://nodejs.org/en/download/releases) and then run the following:

```sh
git clone git@github.com:Chia-Network/core-registry-dashboard-ui.git
cd core-registry-dashboard-ui
npm install
npm run start
```

## Developer Guide

### Prerequisites

You'll need:

- Git
- [nvm](https://github.com/nvm-sh/nvm)

This app uses `nvm` to align node versions across development, CI and production. If you're working on Windows you
should consider [nvm-windows](https://github.com/coreybutler/nvm-windows)

### Development Environment

Use the following commands to prepare you development environment and run the Climate Explorer UI:

```sh
git clone git@github.com:Chia-Network/core-registry-dashboard-ui
cd core-registry-dashboard-ui
nvm install
nvm use
npm install -g husky
npm install -g prettier
npm install -g lint-staged
npm install -g git-authors-cli

npm run start
```

### Contributing

Upon your first commit, you will automatically be added to the package.json file as a contributor.

### Commiting

[Signed commits](https://docs.github.com/en/authentication/managing-commit-signature-verification/signing-commits) are
required.

This repo uses a commit convention. A typical commit message might read:

```
    fix: correct home screen layout
```

The first part of this is the commit "type". The most common types are "feat" for new features, and "fix" for bugfixes.
Using these commit types helps us correctly manage our version numbers and changelogs. Since our release process
calculates new version numbers from our commits it is very important to get this right.

- `feat` is for introducing a new feature
- `fix` is for bug fixes
- `docs` for documentation only changes
- `style` is for code formatting only
- `refactor` is for changes to code which should not be detectable by users or testers
- `perf` is for a code change that improves performance
- `test` is for changes which only touch test files or related tooling
- `build` is for changes which only touch our develop/release tools
- `ci` is for changes to the continuous integration files and scripts
- `chore` is for changes that don't modify code, like a version bump
- `revert` is for reverting a previous commit

After the type and scope there should be a colon.

The "subject" of the commit follows. It should be a short indication of the change. The commit convention prefers that
this is written in the present-imperative tense.

### Commit linting

Each time you commit the message will be checked against these standards in a pre-commit hook. Additionally all the
commits in a PR branch will be linted before it can be merged to master.

### Branch Layout

All pull requests should be made against the `develop` branch. Commits to the `main` branch will trigger a release, so
the `main` branch is always the code in the latest release.

## Attribution

* [Document Object Model](https://www.w3.org/TR/DOM-Requirements/) by [W3C](https://www.w3.org/) licensed under [CC BY 4.0](http://creativecommons.org/licenses/by/4.0/)
* [caniuselite](https://github.com/browserslist/caniuse-lite) by [Browserlist](https://browsersl.ist/) licensed under [CC BY 4.0](http://creativecommons.org/licenses/by/4.0/)
