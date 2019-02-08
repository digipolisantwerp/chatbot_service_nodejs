workflow "Release to npm" {
  on = "release"
  resolves = ["GitHub Action for npm-1"]
}

action "GitHub Action for npm" {
  uses = "actions/npm@3c8332795d5443adc712d30fa147db61fd520b5a"
  runs = "install"
}

action "Filters for GitHub Actions" {
  uses = "actions/bin/filter@9d4ef995a71b0771f438dd7438851858f4a55d0c"
  needs = ["GitHub Action for npm"]
  args = "branch master"
}

action "GitHub Action for npm-1" {
  uses = "actions/npm@3c8332795d5443adc712d30fa147db61fd520b5a"
  needs = ["Filters for GitHub Actions"]
  runs = "publish --access public"
  secrets = ["NPM_AUTH_TOKEN"]
}
