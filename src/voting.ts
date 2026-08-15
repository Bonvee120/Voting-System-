interface Candidate {
  name: string;
  votes: number;
}

interface VotingState {
  candidates: Candidate[];
  votedVoters: Set<string>;
}

const MAX_VOTES = 20;

const voterSelect = document.getElementById(
  "voterSelect"
) as HTMLSelectElement | null;

const candidateSelect = document.getElementById(
  "candidateSelect"
) as HTMLSelectElement | null;

const votingForm = document.getElementById(
  "votingForm"
) as HTMLFormElement | null;

const submitVoteButton = document.getElementById(
  "submitVoteButton"
) as HTMLButtonElement | null;

const votingMessage = document.getElementById(
  "votingMessage"
) as HTMLParagraphElement | null;

const candidateOneName = document.getElementById(
  "candidateOneName"
) as HTMLSpanElement | null;

const candidateTwoName = document.getElementById(
  "candidateTwoName"
) as HTMLSpanElement | null;

const candidateOneScore = document.getElementById(
  "candidateOneScore"
) as HTMLSpanElement | null;

const candidateTwoScore = document.getElementById(
  "candidateTwoScore"
) as HTMLSpanElement | null;

const totalVoteCount = document.getElementById(
  "totalVoteCount"
) as HTMLSpanElement | null;

const checkResultButton = document.getElementById(
  "checkResultButton"
) as HTMLButtonElement | null;

const dialog = document.getElementById(
  "dialog"
) as HTMLDialogElement | null;

const closeDialogButton = document.getElementById(
  "closeDialogButton"
) as HTMLButtonElement | null;

const resultContent = document.getElementById(
  "resultContent"
) as HTMLDivElement | null;



const votingState: VotingState = {
  candidates: [
    {
      name: "Kosi",
      votes: 0,
    },
    {
      name: "Augustine",
      votes: 0,
    },
  ],

  votedVoters: new Set<string>(),
};


if (
  !voterSelect ||
  !candidateSelect ||
  !votingForm ||
  !submitVoteButton ||
  !votingMessage ||
  !candidateOneName ||
  !candidateTwoName ||
  !candidateOneScore ||
  !candidateTwoScore ||
  !totalVoteCount ||
  !checkResultButton ||
  !dialog ||
  !closeDialogButton ||
  !resultContent
) {
  throw new Error(
    "Voting system could not start because one or more HTML elements are missing."
  );
}




function getTotalVotes(): number {
  return votingState.candidates.reduce(
    (total: number, candidate: Candidate): number => {
      return total + candidate.votes;
    },
    0
  );
}



function updateScores(): void {
  const firstCandidate = votingState.candidates[0];
  const secondCandidate = votingState.candidates[1];

  if (candidateOneName) candidateOneName.textContent = firstCandidate.name;
  if (candidateTwoName) candidateTwoName.textContent = secondCandidate.name;

  if (candidateOneScore) candidateOneScore.textContent = String(firstCandidate.votes);
  if (candidateTwoScore) candidateTwoScore.textContent = String(secondCandidate.votes);

  if (totalVoteCount) totalVoteCount.textContent = String(getTotalVotes());
}



function showMessage(
  message: string,
  type: "success" | "error"
): void {
  if (!votingMessage) return;
  
  votingMessage.textContent = message;

  if (type === "success") {
    votingMessage.className =
      "mt-4 text-center font-semibold text-green-600";
  } else {
    votingMessage.className =
      "mt-4 text-center font-semibold text-red-600";
  }
}



function hasVotingEnded(): boolean {
  return getTotalVotes() >= MAX_VOTES;
}



function stopVoting(): void {
  if (voterSelect) voterSelect.disabled = true;
  if (candidateSelect) candidateSelect.disabled = true;
  if (submitVoteButton) {
    submitVoteButton.disabled = true;

    submitVoteButton.classList.remove(
      "bg-blue-600",
      "hover:bg-blue-700"
    );

    submitVoteButton.classList.add(
      "bg-gray-400",
      "cursor-not-allowed"
    );
  }

  showMessage(
    "Voting has ended. The maximum of 20 votes has been reached.",
    "error"
  );
}



function submitVote(): void {
  if (!voterSelect || !candidateSelect) {
    showMessage(
      "An error occurred. Please refresh the page.",
      "error"
    );
    return;
  }

  const selectedVoter = voterSelect.value;
  const selectedCandidate = candidateSelect.value;

  if (hasVotingEnded()) {
    stopVoting();
    return;
  }


  if (!selectedVoter) {
    showMessage(
      "Please select your name before voting.",
      "error"
    );

    return;
  }


  if (!selectedCandidate) {
    showMessage(
      "Please select a candidate before submitting your vote.",
      "error"
    );

    return;
  }


  if (votingState.votedVoters.has(selectedVoter)) {
    showMessage(
      `${selectedVoter} has already voted. Each voter can vote only once.`,
      "error"
    );

    return;
  }


  const candidate = votingState.candidates.find(
    (item: Candidate): boolean =>
      item.name === selectedCandidate
  );



  if (!candidate) {
    showMessage(
      "The selected candidate could not be found.",
      "error"
    );

    return;
  }


  votingState.votedVoters.add(selectedVoter);

  candidate.votes += 1;


  updateScores();


  voterSelect.value = "";
  candidateSelect.value = "";


  showMessage(
    `Vote submitted successfully for ${candidate.name}.`,
    "success"
  );


  if (hasVotingEnded()) {
    stopVoting();
  }
}




function calculateResult(): string {
  const firstCandidate = votingState.candidates[0];
  const secondCandidate = votingState.candidates[1];

  if (firstCandidate.votes === 0 && secondCandidate.votes === 0) {
    return `
      <div class="text-center">
        <p class="text-white">No votes have been cast yet.</p>
      </div>
    `;
  }



  if (firstCandidate.votes === secondCandidate.votes) {
    return `
      <div class="text-center">
        <p class="text-2xl font-bold text-yellow-400">
          IT'S A TIE
        </p>

        <p class="mt-2 text-gray-300">
          ${firstCandidate.name}: ${firstCandidate.votes} votes
        </p>

        <p class="text-gray-300">
          ${secondCandidate.name}: ${secondCandidate.votes} votes
        </p>
      </div>
    `;
  }
 
  const winner =
    firstCandidate.votes > secondCandidate.votes
      ? firstCandidate
      : secondCandidate;


  return `
    <div class="text-center">

      <p class="text-2xl font-bold text-green-400">
        ${winner.name}
      </p>

      <p class="mt-2 text-gray-300">
        is the winner with
        <span class="font-bold text-white">
          ${winner.votes} vote${winner.votes === 1 ? "" : "s"}
        </span>.
      </p>

      <div class="mt-4 text-sm text-gray-400">
        <p>
          ${firstCandidate.name}: ${firstCandidate.votes} votes
        </p>

        <p>
          ${secondCandidate.name}: ${secondCandidate.votes} votes
        </p>
      </div>

    </div>
  `;
}


function showResult(): void {

  if (resultContent) {
    resultContent.innerHTML = calculateResult();
  }

  if (dialog && !dialog.open) {
    dialog.showModal();
  }
}



function closeResult(): void {
  if (dialog && dialog.open) {
    dialog.close();
  }
}



votingForm.addEventListener(
  "submit",
  (event: SubmitEvent): void => {
    event.preventDefault();

    submitVote();
  }
);




checkResultButton.addEventListener(
  "click",
  (): void => {
    showResult();
  }
);




closeDialogButton.addEventListener(
  "click",
  (): void => {
    closeResult();
  }
);



dialog.addEventListener(
  "click",
  (event: MouseEvent): void => {
    if (event.target === dialog) {
      closeResult();
    }
  }
);


updateScores();