import { loadTable } from "../main/main.load-table.js";
import { handleTabAction } from "../tab.select.js";
import { loadGameTopicData } from "./edit.load-edit-data.js";
import { handleSubmitData } from "./edit.submit-data.js";
loadTable(false);
loadGameTopicData();
handleTabAction();
handleSubmitData();
