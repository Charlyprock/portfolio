<template>

    <div class="">
        
        <!-- <div class="fixed inset-0 overflow-hidden pointer-events-none z-0">
            <div v-for="(code, index) in floatingCodes" :key="index" class="floating-code" :style="code.style">
                {{ code.text }}
            </div>
        </div> -->

        <!-- Navigation -->
        <div class="w-[900px] rotate-10 absolute top-0 left-0">
            <img alt="mon logo" src="@/assets/imgs/code.png" class="size-full" />
        </div>
        <nav class="relative w-full bg-black/85 py-[20px] px-[40px] svg-curve">
            
            <div class="flex justify-between items-center py-5 mb-5">
				<div class="w-26">
					<img alt="mon logo" src="@/assets/logo.svg" class="size-full" />
				</div>
				<a href="mailto:kouasseu.tamayeu@gmail.com" class="btn btn-primary">
                    <button class="flex gap-2 cursor-pointer">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                            </svg>
                        </div>
                        Contact
                    </button>
				</a>
			</div>
			
			<section class="flex items-center justify-center">
				<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center mb-5">

					<!-- Profile Card -->
					<div class="flex justify-center lg:justify-start">

						<div class="rounded-box p-8 max-w-sm bg-base-100">

							<div class="">
								<div class="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-primary/50">
									<img src="@/assets/imgs/my_image.png" alt="Profile" class="w-full h-full object-cover">
								</div>

								<h2 class="text-xl font-semibold mb-2 text-center">Développeur Web Full Stack</h2>

								<div class="flex items-center justify-start gap-2 mt-4 mb-2">
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                                    </svg>
									charly.kouasseu@gmail.com
								</div>

								<p class="text-sm leading-relaxed mb-6 text-justify">
									Jeune passionné et déterminé, j'ai une soif de découverte et d'exploration. Coder,
									développer
									et déboguer, ma passion s'exprime au travers des lignes de code et s'intensifie chaque
									jour de mon travail.
								</p>

								<div class="flex justify-end gap-3">
									<div class="size-6 bg-base-content rounded-full"></div>
									<div class="size-6 bg-base-content rounded-full"></div>
								</div>
							</div>
						</div>
					</div>

					<!-- Large Ccharly Logo -->
					<div class="hidden lg:block">
						<div class="" ref="largeLogo">
                            <img alt="mon logo" src="@/assets/logo_dark.svg" class="seze-full" />
						</div>
					</div>
				</div>
			</section>
		</nav>

        <!-- Projects Section -->
        <section class="py-20 relative">

            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <!-- title -->
                <div class="mb-16">

                    <div class="text-4xl font-bold mb-4 flex flex-col items-center">
                        <div ref="projectsTitle">
                            <h2 class="">Projets</h2>
                            <div class="w-8 h-2 bg-primary rounded-field"></div>
                        </div>
                    </div>

                    <p class="text-center max-w-3xl mx-auto">
                        J'ai eu à développer des applications web et des api solides, modernes et sécurisé avec des
                        technologies comme Vue.js, Django et Laravel.
                        Si dessous, des aperçus de quelque de mes travaux.
                    </p>
                </div>

                <!-- projet avec grand cardre -->
                <div class="grid lg:grid-cols-2 gap-8 mb-12">

                    <!-- Projet 1 -->
                    <a href="https://github.com/Charlyprock/picsave" target="_blank" class="rounded-box overflow-hidden hover:scale-105 duration-300 project-item">

                        <div class="p-2 rounded-b-box bg-primary/50">
                            <div class="aspect-video bg-primary/50 relative overflow-hidden rounded-box">
                                <img src="@/assets/imgs/picsave.png" alt="Application de promotion" class="w-full h-full object-cover">
                            </div>
                        </div>

                        <div class="p-6">
                            <h3 class="text-xl font-semibold mb-2">Application web de vente, achat et stockage d'images/vidéos.</h3>
                            <p class="mb-4 text-sm text-base-content/80">
                                Les utilisateurs ont la possibilité de liker, noter, télécharger,
                                uploader, acheter des images/vidéos sur la plateforme.
                            </p>
                            <div class="flex flex-wrap gap-2">
                                <div class="text-primary">
                                    <framework-icon />
                                </div>
                                <span class="badge badge-primary badge-soft">Vue.js</span>
                                <span class="badge badge-primary badge-soft">Laravel</span>
                                <span class="badge badge-primary badge-soft">TailwindCSS</span>
                            </div>
                        </div>

                    </a>

                    <!-- Projet 2 -->
                    <a href="https://github.com/Charlyprock/picchat" target="_blank" class="rounded-box overflow-hidden hover:scale-105 duration-300 project-item">

                        <div class="p-2 rounded-b-box bg-primary/50">
                            <div class="aspect-video bg-primary/50 relative overflow-hidden rounded-box">
                                <img src="@/assets/imgs/picchat.png" alt="Application de promotion" class="w-full h-full object-cover">
                            </div>
                        </div>

                        <div class="p-6">
                            <h3 class="text-xl font-semibold mb-2">Application web de message en temps réel avec websocket.</h3>
                            <p class="mb-4 text-sm text-base-content/80">
                                L'application gère l'envoi et la réception des messages. 
                                Elle gère aussi le statut des messages (envoyer, reçus, vue) 
                                Et classe les récepteurs par date d'envoi ou de réception des messages.
                            </p>
                            <div class="flex flex-wrap gap-2">
                                <div class="text-primary">
                                    <framework-icon />
                                </div>
                                <span class="badge badge-primary badge-soft">Vue.js</span>
                                <span class="badge badge-primary badge-soft">Laravel</span>
                                <span class="badge badge-primary badge-soft">TailwindCSS</span>
                            </div>
                        </div>

                    </a>
                    
                </div>

                <!-- Projets en grille 3 colonnes -->
                <div class="grid md:grid-cols-3 gap-6">

                    <!-- EliteFoot -->
                    <a href="https://elitefoot.cm"  target="_blank" class="rounded-field p-6 bg-base-200 hover:scale-105 duration-300 project-item">

                        <div class="flex justify-center">
                            <div class="size-26">
                                <img alt="mon logo" src="@/assets/imgs/elitefoot.png" class="" />
                            </div>
                        </div>

                        <h3 class="text-lg font-semibold mb-2">EliteFoot</h3>
                        <p class="text-sm mb-4 text-base-content/80">Application de base de donnée du football camerounais</p>
                        
                        <div class="flex flex-wrap gap-2">
                            <div class="text-primary">
                                <framework-icon />
                            </div>
                            <span class="badge badge-primary badge-soft rounded-field">Vue.js</span>
                            <span class="badge badge-primary badge-soft rounded-field">Laravel</span>
                            <span class="badge badge-primary badge-soft rounded-field">TailwindCSS</span>
                        </div>
                    </a>

                    <!-- GrossisteKamer -->
                    <a href="https://grossisteGamer.omegaconsulting-services.com"  target="_blank" class="rounded-field p-6 bg-base-200 hover:scale-105 duration-300 project-item">

                        <div class="flex justify-center">
                            <div class="size-26">
                                <img alt="mon logo" src="@/assets/imgs/gk.png" class="" />
                            </div>
                        </div>

                        <h3 class="text-lg font-semibold mb-2">GrossisteKamer</h3>
                        <p class="text-sm mb-4 text-base-content/80">MarketPlace de e-commerce pour les grossistes et détaillant</p>
                        
                        <div class="flex flex-wrap gap-2">
                            <div class="text-primary">
                                <framework-icon />
                            </div>
                            <span class="badge badge-primary badge-soft rounded-field">Vue.js</span>
                            <span class="badge badge-primary badge-soft rounded-field">Laravel</span>
                            <span class="badge badge-primary badge-soft rounded-field">TailwindCSS</span>
                            <span class="badge badge-primary badge-soft rounded-field">Flutter</span>
                        </div>
                    </a>

                    <!-- Educ-Pay -->
                    <a href="https://educpay.omegaconsulting-services.com"  target="_blank" class="rounded-field p-6 bg-base-200 hover:scale-105 duration-300 project-item">

                        <div class="flex justify-center">
                            <div class="size-26">
                                <img alt="mon logo" src="@/assets/imgs/educpay.png" class="" />
                            </div>
                        </div>

                        <h3 class="text-lg font-semibold mb-2">Educ-Pay</h3>
                        <p class="text-sm mb-4 text-base-content/80">Application web et mobile de paiement scolaire</p>
                        
                        <div class="flex flex-wrap gap-2">
                            <div class="text-primary">
                                <framework-icon />
                            </div>
                            <span class="badge badge-primary badge-soft rounded-field">Vue.js</span>
                            <span class="badge badge-primary badge-soft rounded-field">Laravel</span>
                            <span class="badge badge-primary badge-soft rounded-field">TailwindCSS</span>
                            <span class="badge badge-primary badge-soft rounded-field">Flutter</span>
                        </div>
                    </a>

                </div>
            </div>
        </section>

        <!-- Competences Section -->
        <section class="py-20 relative">

            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <!-- title -->
                <div class="mb-16">

                    <div class="text-4xl font-bold mb-4 flex flex-col items-center">
                        <div ref="skillsTitle">
                            <h2 class="">Compétences</h2>
                            <div class="w-8 h-2 bg-primary rounded-field"></div>
                        </div>
                    </div>
                </div>

                <div class="grid md:grid-cols-3 gap-8">

                    <!-- Frontend -->
                    <div class="rounded-box p-6 border border-primary border-dashed skill-item">

                        <div class="flex items-center mb-4">
                            <div class="size-3 bg-primary rounded-full mr-3"></div>
                            <h3 class="text-xl font-semibold text-primary">Frontend</h3>
                        </div>

                        <ul class="space-y-3">
                            <li class="flex items-center">
                                <span class="size-3 bg-primary/30 rounded-full mr-3"></span>
                                HTML
                            </li>
                            <li class="flex items-center">
                                <span class="size-3 bg-primary/30 rounded-full mr-3"></span>
                                CSS
                            </li>
                            <li class="flex items-center">
                                <span class="size-3 bg-primary/30 rounded-full mr-3"></span>
                                TailwindCSS
                            </li>
                            <li class="flex items-center">
                                <span class="size-3 bg-primary/30 rounded-full mr-3"></span>
                                JavaScript
                            </li>
                            <li class="flex items-center">
                                <span class="size-3 bg-primary/30 rounded-full mr-3"></span>
                                Vue.js
                            </li>
                        </ul>
                    </div>

                    <!-- Backend -->
                    <div class="rounded-box p-6 border border-primary border-dashed skill-item">
                        <div class="flex items-center mb-4">
                            <div class="size-3 bg-primary rounded-full mr-3"></div>
                            <h3 class="text-xl font-semibold text-primary">Backend</h3>
                        </div>
                        <ul class="space-y-3">
                            <li class="flex items-center">
                                <span class="size-3 bg-primary/30 rounded-full mr-3"></span>
                                Python
                            </li>
                            <li class="flex items-center">
                                <span class="size-3 bg-primary/30 rounded-full mr-3"></span>
                                Django
                            </li>
                            <li class="flex items-center">
                                <span class="size-3 bg-primary/30 rounded-full mr-3"></span>
                                Laravel
                            </li>
                            <li class="flex items-center">
                                <span class="size-3 bg-primary/30 rounded-full mr-3"></span>
                                MySQL
                            </li>
                        </ul>
                    </div>

                    <!-- Outils -->
                    <div class="rounded-box p-6 border border-primary border-dashed skill-item">
                        <div class="flex items-center mb-4">
                            <div class="size-3 bg-primary rounded-full mr-3"></div>
                            <h3 class="text-xl font-semibold text-primary">Outils</h3>
                        </div>
                        <ul class="space-y-3">
                            <li class="flex items-center">
                                <span class="size-3 bg-primary/30 rounded-full mr-3"></span>
                                Git
                            </li>
                            <li class="flex items-center">
                                <span class="size-3 bg-primary/30 rounded-full mr-3"></span>
                                Docker
                            </li>
                            <li class="flex items-center">
                                <span class="size-3 bg-primary/30 rounded-full mr-3"></span>
                                Postman
                            </li>
                            <li class="flex items-center">
                                <span class="size-3 bg-primary/30 rounded-full mr-3"></span>
                                Figma
                            </li>
                            <li class="flex items-center">
                                <span class="size-3 bg-primary/30 rounded-full mr-3"></span>
                                Jira
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        <!-- Footer -->
        <footer class="pt-8 overflow-hidden flex justify-between items-end">
                   
            <div class="bg-base-300 pb-6 flex justify-center w-[480px] h-[100px] rounded-[5000%] translate-y-[35%] -translate-x-[20%]">

                <div class="flex items-center gap-3">
                    <!-- facebook -->
                    <a href="https://www.facebook.com/charly.kouasseu/" target="_blank" class="w-8">
                        <img alt="mon logo" src="@/assets/icons/facebook.svg" class="size-full" />
                    </a>

                    <a href="https://www.facebook.com/charly.kouasseu/" target="_blank" class="w-8">
                        <img alt="mon logo" src="@/assets/icons/linkeding.svg" class="size-full" />
                    </a>

                    <a href="mailto:kouasseu.tamayeu@gmail.com" target="_blank">
                        <div class="w-8">
                            <img alt="mon logo" src="@/assets/icons/gmail.svg" class="size-full" />
                        </div>
                    </a>
                </div>
            </div>
            
            <div class="text-base-content/90 p-5">
                <p>©2025</p>
            </div>
        </footer>
    </div>
</template>


<script setup>
    import { ref, onMounted } from 'vue'
	import { animate, stagger } from 'animejs';
    import { FrameworkIcon } from '@/components/icons';

    const largeLogo = ref(null);
    const projectsTitle = ref(null);
    const skillsTitle = ref(null);

    // const floatingCodes = ref([]);

    // const codeSnippets = [
    //     'function createApp() {',
    //     'const { ref, onMounted } = Vue;',
    //     'export default {',
    //     '<template>',
    //     'class="flex items-center"',
    //     '@click="handleClick"',
    //     'v-for="item in items"',
    //     'import { Component } from "vue"',
    //     'const isVisible = ref(false)',
    //     'return { data, methods }',
    //     'style="color: #DF9527"',
    //     'async function fetchData()',
    //     'routes: [{ path: "/" }]',
    //     'computed: { fullName() }',
    //     'watch: { count(newVal) }',
    // ];

    // const initFloatingCodes = () => {
    //     for (let i = 0; i < 15; i++) {
    //         floatingCodes.value.push({
    //             text: codeSnippets[Math.floor(Math.random() * codeSnippets.length)],
    //             style: {
    //                 left: Math.random() * 100 + '%',
    //                 top: Math.random() * 100 + '%',
    //                 animationDelay: Math.random() * 5 + 's',
    //                 animationDuration: (Math.random() * 10 + 10) + 's',
    //             }
    //         });
    //     }
    // };

    const animateOnScroll = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;

                    if (element.classList.contains('project-item')) {
                        animate(element,{
                            translateY: [50, 0],
                            opacity: [0, 1],
                            duration: 800,
                            easing: 'easeOutExpo',
                            delay: stagger(200)
                        });
                    }

                    if (element.classList.contains('skill-item')) {
                        animate(element,{
                            scale: [0.8, 1],
                            opacity: [0, 1],
                            duration: 600,
                            easing: 'easeOutBack',
                            delay: stagger(150)
                        });
                    }
                }
            });
        }, { threshold: 0.1 });

        // Observer les éléments
        document.querySelectorAll('.project-item, .skill-item').forEach(el => {
            observer.observe(el);
        });
    };

    const initAnimations = () => {
        // Animation du logo principal
        animate(largeLogo.value,{
            translateX: [100, 0],
            opacity: [0, 1],
            duration: 1500,
            easing: 'easeOutExpo',
            delay: 500
        });

        // Animation des titres de section
        animate([projectsTitle.value, skillsTitle.value],{
            translateY: [30, 0],
            opacity: [0, 1],
            duration: 800,
            easing: 'easeOutExpo',
            delay: stagger(200)
        });

        // // Animation du code flottant
        // animate('.floating-code',{
        //     translateY: [
        //         { value: -10, duration: 2000 },
        //         { value: 10, duration: 2000 }
        //     ],
        //     opacity: [
        //         { value: 0.3, duration: 1000 },
        //         { value: 0.8, duration: 1000 },
        //         { value: 0.3, duration: 1000 }
        //     ],
        //     loop: true,
        //     direction: 'alternate',
        //     easing: 'easeInOutSine',
        //     delay: stagger(100)
        // });

    };

    onMounted(() => {
        // initFloatingCodes();

        setTimeout(() => {
            initAnimations();
            animateOnScroll();
        }, 100);

        // // Parallax pour le fond
        // window.addEventListener('scroll', () => {
        //     const scrolled = window.pageYOffset;
        //     const parallax = document.querySelectorAll('.floating-code');
        //     const speed = 0.5;

        //     parallax.forEach(element => {
        //         const yPos = -(scrolled * speed);
        //         element.style.transform = `translateY(${yPos}px)`;
        //     });
        // });
    });
</script>

<style scoped>

    /* pour la coube avant la section projet */
    .svg-curve::after {
        transform: rotate(180deg);
        content: '';
        position: absolute;
        bottom: -100px;
        left: 0;
        width: 100%;
        height: 100px;
        background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M0,0V120H1200V0C1200,0,1000,120,600,120S0,0,0,0Z' fill='%23000000D9'%3E%3C/path%3E%3C/svg%3E") no-repeat;
    }

    /* .floating-code {
        position: absolute;
        font-family: 'Courier New', monospace;
        font-size: 12px;
        color: rgba(223, 149, 39, 0.3);
        pointer-events: none;
        z-index: 1;
    } */

</style>