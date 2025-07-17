function check_all_boxes () {
    const three_leg_input = document.getElementById("three-leg-input-box");
    const four_leg_input = document.getElementById("four-leg-input-box");
    const dim_box_1 = document.getElementById("dimension-input-box-1");
    const dim_box_2 = document.getElementById("dimension-input-box-2");

    if (three_leg_input.value === "" || four_leg_input.value === "" || dim_box_1.value === "" || dim_box_2.value === "") {
        document.getElementById("calculate-button").disabled = true;
        document.getElementById("calculate-error").textContent = "Please fill in all fields before generating diagram.";
        document.getElementById("calculate-error").style.display = "block";
        document.getElementById("calculate-error").style.animation = "none";
    } else {
        document.getElementById("calculate-button").disabled = false;
        document.getElementById("calculate-error").style.animation = "fadeOut 2.0s forwards";
        setTimeout(() => {
            document.getElementById("calculate-error").textContent = "";
            document.getElementById("calculate-error").style.display = "none";
        }, 2000);
    }
}

let leg_input_clear_timer;
let leg_input_animation_timer;
let leg_input_main_timer;

function validate_leg_input() {
    const three_leg_input = document.getElementById("three-leg-input-box");
    const four_leg_input = document.getElementById("four-leg-input-box");
    const three_leg_value = Number(three_leg_input.value);
    const four_leg_value = Number(four_leg_input.value);
    const legError = document.getElementById("leg-input-error");

    clearTimeout(leg_input_animation_timer);
    clearTimeout(leg_input_clear_timer);
    clearTimeout(leg_input_main_timer);

    leg_input_main_timer = setTimeout(() => {
        if (!Number.isInteger(three_leg_value)) {
            legError.textContent = "Please only enter whole numbers.";
            three_leg_input.value = Math.floor(three_leg_input.value);
            legError.style.display = "block";
            legError.style.animation = "none";
        }
        if (!Number.isInteger(four_leg_value)) {
            legError.textContent = "Please only enter whole numbers.";
            four_leg_input.value = Math.floor(four_leg_input.value);
            legError.style.display = "block";
            legError.style.animation = "none";
        }
        if (three_leg_value < 0) {
            legError.textContent = "Please only enter positve values.";
            three_leg_input.value = 0;
            legError.style.display = "block";
            legError.style.animation = "none";
        } 
        if (four_leg_value < 0) {
            legError.textContent = "Please only enter positive values.";
            four_leg_input.value = 0;
            legError.style.display = "block";
            legError.style.animation = "none";
        }
        leg_input_animation_timer = setTimeout(() => {
            legError.style.animation = "fadeOut 2.0s forwards";
            leg_input_clear_timer = setTimeout(() => {
                legError.style.display = "none";
                legError.textContent = "";
            }, 1500);
        }, 4000);
    }, 1500);
    check_all_boxes();
}

document.getElementById("three-leg-input-box").addEventListener("input", validate_leg_input);
document.getElementById("four-leg-input-box").addEventListener("input", validate_leg_input);



let main_stage_timer;
let dim_clear_timer;
let dim_animation_timer;

function validate_stage_input() {
    clearTimeout(main_stage_timer);
    clearTimeout(dim_clear_timer);
    clearTimeout(dim_animation_timer);

    const dim_box_1 = document.getElementById("dimension-input-box-1");
    const dim_box_2 = document.getElementById("dimension-input-box-2");
    const dim_value_1 = Number(dim_box_1.value);
    const dim_value_2 = Number(dim_box_2.value);
    dimError = document.getElementById("dimension-input-error");

    main_stage_timer = setTimeout(() => {
        if (dim_value_1 % 4 !== 0) {
            dimError.textContent = "Dimension values must be a multiple of 4.";
            dim_box_1.value = Math.ceil(dim_value_1 / 4) * 4;
            dimError.style.display = "block";
            dimError.style.animation = "none";
        }
        if (dim_value_2 % 4 !== 0) {
            dimError.textContent = "Dimension values must be a multiple of 4.";
            dim_box_2.value = Math.ceil(dim_value_2 / 4) * 4;
            dimError.style.display = "block";
            dimError.style.animation = "none";
        }
        if (dim_value_1 < 8 && dim_box_1.value !== "") {
            dimError.textContent = "Please only enter values greater than or equal to 8.";
            dim_box_1.value = 8;
            dimError.style.display = "block";
            dimError.style.animation = "none";
        } 
        if (dim_value_2 < 8 && dim_box_2.value !== "") {
            dimError.textContent = "Please only enter values greater than or equal to 8.";
            dim_box_2.value = 8;
            dimError.style.display = "block";
            dimError.style.animation = "none";
        } 
        if (!Number.isInteger(dim_value_1)) {
            dimError.textContent = "Please only enter whole numbers.";
            dim_box_1.value = Math.floor(dim_box_1.value);
            dim_box_1.value = Math.ceil(dim_box_1.value / 4) * 4;
            dimError.style.display = "block";
            dimError.style.animation = "none";
        } 
        if (!Number.isInteger(dim_value_2)) {
            dimError.textContent = "Please only enter whole numbers.";
            dim_box_2.value = Math.floor(dim_box_2.value);
            dim_box_2.value = Math.ceil(dim_box_2.value / 4) * 4;
            dimError.style.display = "block";
            dimError.style.animation = "none";
        }
        
        dim_animation_timer = setTimeout(() => {
            dimError.style.animation = "fadeOut 2.0s forwards";
            dim_clear_timer = setTimeout(() => {
                dimError.style.display = "none";
                dimError.textContent = "";
            }, 1500)
        }, 4000);
    }, 1500);
    check_all_boxes();
}

document.getElementById("dimension-input-box-1").addEventListener("input", validate_stage_input);
document.getElementById("dimension-input-box-2").addEventListener("input", validate_stage_input);