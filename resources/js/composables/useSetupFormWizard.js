import {ref} from "vue";

export const useSetupFormWizard = () => {

    let shownStep = ref(1);

    const moveForward = function () {
        if(shownStep.value <= 3) {
            shownStep.value++;
        }
    }

    const moveBackward = function () {
        if(shownStep.value >= 2) {
            shownStep.value--;
        }
    }

    return {
        shownStep,
        moveForward,
        moveBackward
    }
}
