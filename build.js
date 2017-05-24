require('dotenv-safe').load()

const fs = require('fs')
const path = require('path')
const GitHub = require('github')
const {RateLimiter} = require('limiter')
const limiter = new RateLimiter((5000 / 60 / 60), 'second')
const github = new GitHub({
  debug: false
})
github.authenticate({
  type: 'token',
  token: process.env.GITHUB_TOKEN
})

const repo = {
  owner: 'electron',
  repo: 'electron'
}

const locales = 'cz es fr-FR id it-IT jp ko-KR nl pt-BR ru-RU th-TH tr-TR uk-UA zh-CN zh-TW'.split(' ')
const pages = [1,2,3,4,5]
const expectedRequests = locales.length * pages.length
let completedRequests = 0
const translators = {}

locales.forEach(locale => {
  translators[locale] = []

  pages.forEach(page => {
    limiter.removeTokens(1, () => {
      const opts = Object.assign(repo, {
        path: `docs-translations/${locale}`,
        page: page,
        per_page: 100
      })
      github.repos.getCommits(opts)
        .then(commits => {
          commits.data.forEach(commit => {
            if (commit && commit.author && commit.author.login) {
              const login = commit.author.login
              console.error(`${locale} -> ${login}`)
              if (!translators[locale].includes(login)) translators[locale].push(login)
            }
          })
          completedRequests++
          if (completedRequests === expectedRequests) {
            process.stdout.write(JSON.stringify(translators, null, 2))
            process.exit()
          }
        })
    })  
  })
})
