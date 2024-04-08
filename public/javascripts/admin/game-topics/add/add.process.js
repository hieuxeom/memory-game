import { loadTable } from "../main/main.load-table.js";
import { handleTabAction } from "../tab.select.js";
import { handleSubmitData } from "./add.submit-data.js";
loadTable(false);
handleTabAction();
handleSubmitData();
