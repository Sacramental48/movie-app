<script setup>

</script>

<template>
    <div class="flex items-center h-20 border-b">
        <div class="flex justify-between items-center container">
            <div>
                <img class="cursor-pointer" src="../assets/img/logo/logo.svg" alt="img">
            </div>
            <div>
                <nav>
                    <ul class="flex gap-6">
                        <li class="li-style">Main</li>
                        <li class="li-style">Movies</li>
                        <li class="li-style">Serials</li>
                        <li class="li-style">Multifilms</li>
                        <li class="li-style">New</li>
                    </ul>
                </nav>
            </div>
            <div class="flex gap-4">
                <div>
                    <input type="text" placeholder="Input" class="block h-8 px-4 w-full border-gray-300 rounded-full shadow-md sm:text-md">
                </div>
                <div>
                    <button class="px-4 py-1 border shadow-md rounded-2xl border-gray-200">GoIn</button>
                </div>
            </div>
        </div>
    </div>
</template>