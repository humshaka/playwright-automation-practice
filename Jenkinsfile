// Jenkinsfile - Declarative Pipeline for the SEP Playwright QA Automation project.
//
// Setup instructions (one time):
//   1. Create a Jenkins Pipeline job.
//   2. Under "Pipeline" choose "Pipeline script from SCM":
//        - SCM:            Git
//        - Repository URL: https://github.com/humshaka/playwright-automation-practice.git
//        - Branch:         main
//        - Script Path:    Jenkinsfile
//   3. Add these "Secret text" credentials (Manage Jenkins > Credentials > Global):
//        SEP_QA_URL     -> https://qa.sep.tdtm.cydeo.com/taws
//        SEP_USERNAME   -> the SEP HTTP-Basic username
//        SEP_PASSWORD   -> the SEP HTTP-Basic password
//      (or rename the credential IDs below to match credentials you already have)
//
// The values are injected at runtime from Jenkins - they are never hardcoded
// in this file and never stored in Git.

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

        // SEP credentials come from Jenkins credentials - do not hardcode.
        SEP_QA_URL     = credentials('SEP_QA_URL')
        SEP_USERNAME   = credentials('SEP_USERNAME')
        SEP_PASSWORD   = credentials('SEP_PASSWORD')
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
            // Preserve the HTML report and JUnit XML as build artifacts.
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
            junit allowEmptyResults: true, testResults: 'test-results/junit.xml'
        }
        success {
            echo 'SUCCESS: All Playwright tests passed.'
        }
        failure {
            echo 'FAILURE: Playwright tests failed - see the archived playwright-report/index.html.'
        }
    }
}
