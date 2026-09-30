# Jenkins Auto-Trigger via GitHub Webhook

After every push to `main`, this guide makes Jenkins build the
`playwright-automation-practice` Pipeline automatically — no manual "Build Now".

> ⚠️ **Important prerequisite:** GitHub must be able to *reach* your Jenkins
> server. If Jenkins runs on your local machine (`localhost`), GitHub cannot
> reach it. You need a publicly accessible URL, e.g.:
> - a public IP / domain that forwards to port `8080`, or
> - a tunnel such as `ngrok http 8080` or `localhost.run`, or
> - a cloud VM hosting Jenkins.

---

## 1. Jenkins side

### 1.1 Install the GitHub plugin

1. **Manage Jenkins → Plugins → Available plugins**.
2. Search for **GitHub** and install it (restart Jenkins if prompted).
   - It provides the `/github-webhook/` receiver endpoint.
   - The Pipeline needs an SCM so `checkout scm` works — our job already uses
     *Pipeline script from SCM* with Git, so this is satisfied.

### 1.2 Enable the hook trigger on the job

1. Open the **pipeline-automation-practice** job → **Configure**.
2. Under **Build Triggers**, tick:
   - **GitHub hook trigger for GITScm polling**
3. Save.

> Optional hardening: in *Manage Jenkins → System → GitHub → Advanced* you can
> add a **Shared secret** and send it in the webhook as the `X-GitHub-Event` /
> signed payload. Keep it simple first; add the secret once it works.

---

## 2. GitHub side

1. Go to the repo → **Settings → Webhooks → Add webhook**.
2. **Payload URL**:
   ```
   http://<YOUR-PUBLIC-JENKINS-URL>/github-webhook/
   ```
   e.g. `http://jenkins.example.com:8080/github-webhook/`
   or `https://<ngrok-id>.ngrok.io/github-webhook/` when tunnelling.
   - The trailing slash matters.
3. **Content type**: `application/json`.
4. **Secret** (optional): leave empty to start.
5. **Which events**: choose **Just the push event** (enough for CI) or
   *"Send me everything"* if you also want PR/issue events.
6. Click **Add webhook**.

GitHub immediately sends a test `ping` — Jenkins should respond with
`HTTP 200` (green checkmark next to the webhook).

---

## 3. Test it end-to-end

```bash
git add .
git commit -m "test: trigger CI via webhook"
git push origin main
```

Expected result: the job starts automatically a few seconds after the push,
without anyone clicking **Build Now**. Check the **GitHub Hook Log** on the
job page for `Received` events.

---

## 4. Troubleshooting

| Symptom | Fix |
|---|---|
| Webhook shows red / `502` | Jenkins is not publicly reachable — use ngrok, port forwarding, or a real host. |
| `301`/`404` on `/github-webhook/` | GitHub plugin not installed, or trailing slash missing. |
| Webhook is green but job never runs | Job config → **Build Triggers** → *GitHub hook trigger for GITScm polling* is unchecked. |
| Jenkins logs `ping` but not `push` | Webhook events only contain **push** — check the event selection. |
| Build triggers for every branch | Webhook fires on any push; the Jenkinsfile targets `main` via the job's branch setting, so only `main` builds. |

---

## 5. Security notes

- Never hardcode `SEP_PASSWORD` (or any credential) in webhooks or URLs.
- The Jenkins credentials (`SEP_QA_URL`, `SEP_USERNAME`, `SEP_PASSWORD`) stay
  in **Manage Jenkins → Credentials** and are injected by the Pipeline.
- Prefer HTTPS for Jenkins when exposed to the internet, and consider the
  GitHub webhook **secret** so payloads can be verified.
