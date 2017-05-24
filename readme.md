# Electron Translators

The open-source Electron project has an awesome global community of contributors. This repo exists to collect the GitHub usersnames of everyone who has helped translate Electron's documentation into different languages.

This data is being collected so we can:

1. Acknowledge these translators and thank them for their contributions
1. Invite the translators to participate in a more formal and organized Electron localization effort.

## The Translators

See [translators.json](translators.json)

## The Old Way

There's a
[doc-translations](https://github.com/electron/electron/tree/master/docs-translations)
directory in the `electron/electron` repo with one subdirectory per locale. When folks want to translate docs, they just copy the English content, translate it, then open a pull request.

This has worked okay, but there are problems:

- translations are always out of date
- we can't easily verify translation quality
- these docs only live in the Electron repo, not on the website

## The New Way

We want GitHub to be useful for developers everywhere in the world, so we are ramping up our localization efforts.

For the Electron project specifically, we will be using a third-party tool called [Crowdin](https://crowdin.com) to coordinate a crowdsource translation effort. For more details on how this will work, see https://github.com/electron/electron-i18n

