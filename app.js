/* =========================================================
   UPDATE ALL UI
   ========================================================= */

function updateAllUI() {

  updateHeader();

  updateMissionUI();

  updateProfileUI();

  updateWritingUI();

  updateProgressUI();

  updateBadgeUI();

}


/* =========================================================
   UPDATE WRITING UI
   ========================================================= */

function updateWritingUI() {

  const textarea =
    byId(
      "karanganInput"
    );


  if (
    textarea &&
    textarea.value !==
      appState.savedWriting
  ) {

    textarea.value =
      appState.savedWriting ||
      "";

  }


  updateWordCount();


  /*
    Keep app startup safe even if
    Writing Studio progress function
    is not available yet.
  */

  if (
    typeof updateWritingStudioProgress ===
    "function"
  ) {

    updateWritingStudioProgress();

  }

}


/* =========================================================
   WORD COUNT
   ========================================================= */

function updateWordCount() {

  const textarea =
    byId(
      "karanganInput"
    );


  const counter =
    byId(
      "writingWordCount"
    );


  if (
    !textarea ||
    !counter
  ) {

    return;

  }


  const text =
    String(
      textarea.value || ""
    ).trim();


  const count =
    text
      ? text
          .split(/\s+/)
          .filter(Boolean)
          .length
      : 0;


  counter.textContent =
    count;

}


/* =========================================================
   44. AI WRITING FEEDBACK
   ========================================================= */
