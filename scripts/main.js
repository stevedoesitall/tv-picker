import { get_id, headers, cl, string, create_el } from "https://rawgit.com/stevedoesitall/ditkojs/master/ditko.js";

const submit_btn = get_id("submit");

submit_btn.addEventListener("click", function submit_form() {
    const show = get_id("shows").value;
    // alert(`Getting recs for ${show}`);
    fetch("/server", {
        method: "post",
        headers: headers,
        body: string({id: show})
    })
    .then(
        function(response) {
        if (response.status != 200) {
            cl("Error: " + response.status);
            return;
        }
        response.json().then(
            function(resp_data) {
                cl(resp_data);
                get_id("recs_ctnr").innerHTML = "";

                get_id("recs_ctnr").innerHTML += "<p>" + resp_data.name + " - " + "Season " + resp_data.season_number + ", Episode " + resp_data.episode_number + "</p><p>" + resp_data.overview + "</p>";
            })
        })
        .catch(error => cl(error) );
});