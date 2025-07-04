<script lang="ts">
    import type { PageProps } from "./$types";
    import { goto } from "$app/navigation";
    let { data }: PageProps = $props();
    let name = $state("");
    let timeout: NodeJS.Timeout;
    let searching = false;

    const handleInput = (event: Event & { currentTarget: HTMLInputElement }) => {
        const inputName = event.currentTarget.value;
        const urlParams = new URLSearchParams(window.location.search);

        searching = true;
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
            searching = false;
            if (inputName === "") {
                urlParams.delete("name");
            } else {
                urlParams.set("name", inputName);
            }
            const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
            goto(newUrl, { keepFocus: true });
        }, 500); //0,5 segundos
    };
</script>

<div class="mainDiv">
    <div class="divInput">
        <p class="mainText">Digite um nome abaixo:</p>
        <label for="name"></label>
        <input
            bind:value={name}
            placeholder="Insira um nome"
            oninput={handleInput}
        />
        {#if data.nameInformation?.name && data.nameInformation?.age && data.nameInformation?.count}
            <p class="infoText">
                Constam <b>{data.nameInformation.count}</b> pessoas com o nome <b>{data.nameInformation.name}</b> nos registros, e a média de idade delas é de
                <b>{data.nameInformation.age}</b> anos.
            </p>
        {/if}
    </div>
</div>

<style>
    :global(body) {
        margin: 0;
        padding: 0;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .mainDiv {
        background-image: radial-gradient(
            circle,
            #2626c9,
            #0055de,
            #0078ea,
            #2b99ef,
            #6cb7f0
        );
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .divInput {
        background-color: rgba(245, 245, 245, 0.92);
        width: 30vw;
        height: auto;
        border-radius: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 60px 0;
        gap: 20px
    }

    p {
        margin: 0
    }

    .mainText {
        font-weight: 500;
        font-size: large;
    }

    input {
        width: 65%;
        padding: 9px;
        border-radius: 8px;
        border: 2px solid #2626c9;
    }

    .infoText {
        width: 70%;
        text-align: center;
    }

    @media only screen and (max-width: 700px) {
        .divInput {
            width: 60vw;
        }
    }

</style>
