document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('pokemonForm');
    const pokemonInfo = document.getElementById('pokemonInfo');
    const pokemonTitle = document.getElementById('pokemonTitle');
    const pokemonImage = document.getElementById('pokemonImage');
    const pokemonDescription = document.getElementById('pokemonDescription');
    const pokemonTypes = document.getElementById('pokemonTypes');
    const pokemonAbilities = document.getElementById('pokemonAbilities');
    const pokemonStats = document.getElementById('pokemonStats');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const pokemonName = document.getElementById('pokemonName').value.toLowerCase();
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
            if (!response.ok) {
                throw new Error('Pokémon no encontrado');
            }
            const data = await response.json();
            
            // Mostrar nombre y descripción básica
            pokemonTitle.textContent = data.name.toUpperCase();
            pokemonImage.src = data.sprites.front_default;
            pokemonDescription.textContent = `Altura: ${data.height} | Peso: ${data.weight}`;

            // Mostrar tipos del Pokémon
            const types = data.types.map(typeInfo => typeInfo.type.name).join(', ');
            pokemonTypes.textContent = `Tipos: ${types}`;

            // Mostrar habilidades del Pokémon
            const abilities = data.abilities.map(abilityInfo => abilityInfo.ability.name).join(', ');
            pokemonAbilities.textContent = `Habilidades: ${abilities}`;

            // Mostrar estadísticas del Pokémon
            const stats = data.stats.map(statInfo => `${statInfo.stat.name}: ${statInfo.base_stat}`).join(', ');
            pokemonStats.textContent = `Estadísticas: ${stats}`;

            pokemonInfo.classList.remove('hidden');
        } catch (error) {
            alert('No se encontró el Pokémon, intenta de nuevo.');
            pokemonInfo.classList.add('hidden');
        }
    });
});
