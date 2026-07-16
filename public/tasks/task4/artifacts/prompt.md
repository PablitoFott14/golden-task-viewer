
## Category	
Operations & QA

## Category Description	
Agent-as-back-office-operator. Visual evidence (receipts, screenshots, before/after photos) either updates an existing system of record (expense doc, form, inventory DB) or gates an action against a claim.

## Subcategory	
UI/UX Screenshot Audit/form-filling

## Universe	
rebecca_davis

## Multimodal input strong suggestion	
upload image, api image, CSV


## Prompt

Hey, I need to send a report to Colton about the latest implemented refund module status and I feel like I won't be able to do it on time. The deadline is here, and I only have 1 issue marked as solved. I'm attaching my jira personal notes about the bugs to check and the screenshots from the RC build. This ss come straight from our shared RC team folder (manual ss, Amara and Kai live testing records, and direct build export script saves are usually there), so their filenames may be all over the place.

I am expecting you to generate refund_mod_QA_results.svg as the final report to send Colton. We always follow a specific structure for this type of reports, so I adapted it and uploaded here as well. Make sure to follow all the requirements stated there.

Once you are done with the report, you will append to MEMORY.md the results of the bugs in two sections ("SOLVED" and "UNSOLVED"). Since our official jira tracker is usually outdated I'm already used to keeping my own track, but I always forget to label the ticket for each bug. Because of that, every MEMORY.md entry needs to be referenced using my personal tracker bug name and its matching issue key from the team's tracker email notification. If no matching issue keys are found for any bugs just generate them continuing the count from the latest registered one (follow that same format). Do not address bugs not logged in my jira.

Finally, send an update in our qa team slack channel stating the bugs solved and unsolved (without its issue keys, just my jira names) and ask Kai and Amara for help to follow up on the unresolved ones. Also, send the .svg to Colton via email with the subject "current refund module QA status".