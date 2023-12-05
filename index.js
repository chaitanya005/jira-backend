const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 4000;
app.use(cors());

const jiraAPIToken =
  "ATATT3xFfGF0ZWdupnsqjF3vhAdW0Kv8ODQy4yTtp2NqahOcvQIzro7erlt3m7LEPNYQzzJdL-iw_7ZQmwwoBLvto8i8mf7isT91QS7qEsIVLKRsoYmUHT8sqyYiTocw2jLlnKQE8zS0_2Ot1FwrUv85FoAtQ_5iVWTMG-7pB-lkBAnaPv5fRRU=F3914F70";

const jiraURL = "https://chaitanya-jira.atlassian.net/rest/api/3/";

app.get("/issues", async (_req, res) => {
  try {
    const response = await axios.get(`${jiraURL}/search?jql=project=10000`, {
      headers: {
        Authorization: `Basic ${Buffer.from(
          `muvvalachaitanya05@gmail.com:${jiraAPIToken}`
        ).toString("base64")}`,
        Accept: "application/json",
      },
    });
    const jiraData = response.data;
    const issuesData = jiraData.issues.map((issue) => ({
      task: issue.fields.summary,
      assignee: issue.fields.assignee?.displayName || null,
      percentage: issue.fields.aggregateprogress?.percent || 0,
    }));

    res.json({
      projectName: jiraData.issues?.[0]?.fields?.project?.name,
      issuesData,
    });
  } catch (error) {
    console.log(error, error.response);
    res.send(error);
  }
});

app.get("/", (req, res) => {
  console.log("backend is UP");
  res.json({ message: "Server is Up and running!🥳" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
