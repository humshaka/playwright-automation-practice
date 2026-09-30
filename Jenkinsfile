// Jenkinsfile - Declarative Pipeline for the SEP Playwright QA Automation project.
//
// Setup (one time, in Jenkins):
//   1. Create a Pipeline job, "Pipeline script from SCM":
//        - SCM:            Git
//        - Repository URL: https://github.com/humshaka/playwright-automation-practice.git
//        - Branch:         */main
//        - Script Path:    Jenkinsfile
//   2. Credentials (Manage Jenkins > Credentials > Global):
//        ID: sep-qa-credentials  ->  Type: Username with password
//        (username = SEP username, password = SEP password)
//
//   No other credentials are required. SEP_QA_URL is a public URL and is defined
//   below directly. No secrets are stored in this file or committed to Git.

pipeline {
    agent any

    options {
        // Don't run two builds of this job at the same time.
        disableConcurrentBuilds()
    }

    environment {
        // Tells playwright.config.js we are in CI:
        // enables retries=2, a single worker, and fails on test.only.
        CI = 'true'

        // SEP_QA_URL is a public URL, not a secret - safe to set here.
        SEP_QA_URL = 'https://qa.sep.tdtm.cydeo.com/taws'

        // Bind the existing "Username with password" credential (sep-qa-credentials).
        // The _USR / _PSW suffixes split it into the SEP_USERNAME / SEP_PASSWORD
        // environment variables that the Playwright suite expects.
        SEP_USERNAME = credentials('sep-qa-credentials_USR')
        SEP_PASSWORD = credentials('sep-qa-credentials_PSW')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                // npm install does NOT download browser binaries - this is required.
                bat 'npx playwright install chromium'
            }
        }

        stage('Verify Environment') {
            steps {
                bat '''
                    @echo off
                    if not defined SEP_QA_URL   (echo [ERROR] SEP_QA_URL is not set & exit /b 1)
                    if not defined SEP_USERNAME (echo [ERROR] SEP_USERNAME is not set & exit /b 1)
                    if not defined SEP_PASSWORD (echo [ERROR] SEP_PASSWORD is not set & exit /b 1)
                    echo [OK] All SEP environment variables are present.
                '''
            }
        }

        stage('Run Playwright Tests') {
            steps {
                // `bat` fails the build automatically if the test run exits non-zero.
                bat 'npm test'
            }
        }
    }

    post {
        always {
            script {
                // Only archive/publish reports when a workspace (FilePath) actually
                // exists - avoids MissingContextVariableException on early aborts.
                if (env.WORKSPACE) {
                    // HTML report is optional: allowEmptyArchive means the build does
                    // not fail if playwright-report/ does not exist.
                    archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true

                    // Publish JUnit results only if the XML file was actually produced.
                    if (fileExists('test-results/junit.xml')) {
                        junit allowEmptyResults: true, testResults: 'test-results/junit.xml'
                    }
                }
            }
        }
        success {
            echo 'SUCCESS: All Playwright tests passed.'
        }
        failure {
            echo 'FAILURE: Playwright tests failed - see the archived playwright-report/index.html.'
        }
    }
}
