# Risks

| Risk | Impact | Owner | Mitigation | Status |
|---|---|---|---|---|
| Month-end report breaks during cutover | Finance closes late | me | Cut over mid-month; run both in parallel for one cycle | open |
| Hidden consumers of report extracts | Silent data loss downstream | Platform admin | Scheduler audit (T-003) | open |
