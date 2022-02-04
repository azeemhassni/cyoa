import { createMachine } from "xstate";

export const optionMachine = createMachine({
  id: "option",
  states: {
    inactive: {
      on: {
        SELECT: "selected"
      }
    },
    active: {
      on: {
        DESELECT: "deselected"
      }
    }
  }
});

const breederMachine = createMachine({
  id: "breederPath"
});

const consumerMachine = createMachine({
  id: "consumerPath",
  initial: "selfDescribeBreed",
  states: {
    selfDescribeBreed: {
      on: {
        NEXT: "interests"
      }
    },

    interests: {
      on: {
        PREV: "selfDescribeBreed",
        NEXT: "finish"
      }
    },

    finish: {
      // exit out of this machine and go to recommendation
    }
  }
});

// export const quizMachine = createMachine({
//   initial: "question_1",
//   states: {
//     question_1: {
//       on: {
//         NEXT: "question_1"
//       }
//     },

//     question_2: {
//       on: {
//         NEXT: "question_3",
//         PREV: "question_1"
//       }
//     }
//   }
// });

export const cyoaMachine = createMachine({
  id: "cyoa",
  initial: "start",
  context: {
    recommendation: undefined
  },
  states: {
    start: {
      on: {
        BREEDER: "#questions.breeder",
        CONSUMER: "#questions.consumer"
      }
    },
    question: {
      id: "questions",
      states: {
        breeder: {
          invoke: {
            id: "breeder",
            src: breederMachine
          }
        },
        consumer: {
          invoke: {
            id: "consumer",
            src: consumerMachine
          }
        }
      }
    },
    recommendation: {}
  }
});
