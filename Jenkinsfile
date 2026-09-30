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
//   The credential is bound with the explicit withCredentials/usernamePassword
//   step, and ONLY within the stage that runs the tests. No secrets are stored
//   in this file or committed to Git. SEP_QA_URL is a public URL, not a secret.

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

        stage('Run Playwright Tests') {
            steps {
                script {
                    // Explicit, safest credential binding. The credential ID is the
                    // real Jenkins credential ('sep-qa-credentials'); there is no
                    // credential named SEP_USERNAME or SEP_PASSWORD.
                    // SEP_USERNAME / SEP_PASSWORD exist ONLY inside this block and
                    // are automatically masked in the console log.
                    withCredentials([
                        usernamePassword(
                            credentialsId: 'sep-qa-credentials',
                            usernameVariable: 'SEP_USERNAME',
                            passwordVariable: 'SEP_PASSWORD'
                        )
                    ]) {
                        // Sanity check that the injected variables are present.
                        bat '''
                            @echo off
                            if not defined SEP_USERNAME (echo [ERROR] SEP_USERNAME is not set & exit /b 1)
                            if not defined SEP_PASSWORD (echo [ERROR] SEP_PASSWORD is not set & exit /b 1)
                            echo [OK] SEP credentials injected by withCredentials.
                        '''

                        // The Playwright test command runs INSIDE the block so the
                        // node process inherits SEP_USERNAME / SEP_PASSWORD.
                        bat 'npm test'
                    }
                }
            }
        }
    }

    post {
        always {
            script {
                // Archive/publish reports only when a workspace (FilePath) exists.
                // This avoids MissingContextVariableException if the build aborts
                // before a workspace is allocated.
                try {
                    if (env.WORKSPACE) {
                        // HTML report is optional - allowEmptyArchive means the build
                        // does not fail if playwright-report/ does not exist.
                        archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true

                        // JUnit reporter IS configured in playwright.config.js
                        // (outputFile: test-results/junit.xml). Publish only when the
                        // XML file was actually produced.
                        if (fileExists('test-results/junit.xml')) {
                            junit allowEmptyResults: true, testResults: 'test-results/junit.xml'
                        }
                    }
                } catch (Exception e) {
                    // Report archiving/publishing must never fail the build.
                    echo "WARN: could not archive/publish reports: ${e.message}"
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
