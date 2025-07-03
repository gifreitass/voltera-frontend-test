<script>
    let name = $state('')

    const handleInput = (event) => {
        const urlParams = new URLSearchParams(window.location.search)
        urlParams.set('name', event.target.value)
        const newUrl = `${window.location.pathname}?${urlParams.toString()}`
        window.history.replaceState(null, '', newUrl)
    }

</script>

<p>Digite um nome abaixo:</p>
<label for="name"></label>
<input bind:value={name} placeholder="Insira um nome" oninput={handleInput} />
<p>Hello {name || "stranger"}!</p>

<!-- usuário não precisa apertar enter, somente esperar depois que digitou (debounce de 500-1000ms) -->
<!-- load para a requisição -->
<!-- não consultar a api se o nome estiver vazio -->
