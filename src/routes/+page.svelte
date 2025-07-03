<script lang="ts">
    import type { PageProps } from "./$types";
    import { goto } from "$app/navigation";
    let { data }: PageProps = $props();
    let name = $state("");
    let timeout: NodeJS.Timeout;
    let searching = false;

    // alterar any
    const handleInput = (event: any) => {
        const inputName = event.target.value;
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

<p>Digite um nome abaixo:</p>
<label for="name"></label>
<input bind:value={name} placeholder="Insira um nome" oninput={handleInput} />
{#if data.nameInformation?.name && data.nameInformation?.age && data.nameInformation?.count}
    <p>
        Pessoas com o nome {data.nameInformation.name} tem uma média de idade de
        {data.nameInformation.age} anos
    </p>
{/if}

<!-- quando atualizar a página não limpar o input -->
