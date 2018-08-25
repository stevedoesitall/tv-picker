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
                const name = resp_data.name;
                const overview = resp_data.overview;
                const episode_number = resp_data.episode_number;
                const season_number = resp_data.season_number;
                const air_date = new Date(resp_data.air_date).toDateString();
                // const image = "https://image.tmdb.org/t/p/w500" + resp_data.stil_path;
                
                get_id("recs_ctnr").innerHTML = "";
                const title = create_el("p");
                    title.innerHTML = name + " - " + "Season " + season_number + ", Episode " + episode_number;

                    title.setAttribute("id", "rec_title");

                const aired = create_el("p");
                    aired.innerHTML = "Aired: " + air_date;

                const body = create_el("p");
                    body.innerHTML = overview;

                get_id("recs_ctnr").appendChild(title);
                get_id("recs_ctnr").appendChild(aired);
                get_id("recs_ctnr").appendChild(body);

                submit_btn.innerHTML = "Update";
            })
        })
        .catch(error => cl(error) );
});