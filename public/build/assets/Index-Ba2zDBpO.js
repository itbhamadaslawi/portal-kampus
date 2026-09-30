import{n as e,t}from"./DashboardLayout-BxkfPm-T.js";import{A as n,C as r,E as i,I as a,M as o,N as ee,P as s,S as te,T as c,c as l,g as u,h as d,i as f,j as p,l as m,p as h,t as ne,u as g,v as _,x as re,y as v}from"./app-Bx-7FIdl.js";import{t as y}from"./_plugin-vue_export-helper-BDNMzG2s.js";var ie={class:`w-full min-w-0 space-y-6`},ae={key:0,class:`flex items-start justify-between gap-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700`},oe={key:1,class:`flex items-start justify-between gap-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700`},se={class:`w-full min-w-0 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm`},ce={class:`w-full min-w-0 px-4 py-4 sm:px-6`},le={class:`users-table-wrapper relative w-full min-w-0`},ue={key:0,class:`pointer-events-none absolute inset-x-0 top-[56px] z-30 min-h-[520px] overflow-hidden bg-white`},de={class:`w-full max-w-md overflow-hidden rounded-xl bg-white shadow-2xl`},fe={class:`px-6 pt-6`},pe={key:0,width:`24`,height:`24`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,"stroke-width":`1.8`,"stroke-linecap":`round`,"stroke-linejoin":`round`},me={key:1,width:`24`,height:`24`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,"stroke-width":`1.8`,"stroke-linecap":`round`,"stroke-linejoin":`round`},he={key:2,width:`24`,height:`24`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,"stroke-width":`1.8`,"stroke-linecap":`round`,"stroke-linejoin":`round`},ge={class:`mt-4 text-lg font-semibold text-gray-900`},_e={class:`mt-2 text-sm leading-6 text-gray-500`},ve={class:`flex justify-end gap-2 px-6 py-5`},ye=[`disabled`],be=[`disabled`],xe={key:0,class:`h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white`},Se={class:`w-full max-w-lg rounded-xl bg-white shadow-xl`},Ce={class:`flex items-center justify-between border-b border-gray-200 px-5 py-4`},we={class:`px-5 py-5`},Te={key:0,class:`flex items-center justify-center py-10`},Ee={key:1,class:`space-y-4`},De={class:`flex items-center gap-4`},Oe={class:`flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-lg font-semibold text-gray-600`},ke={class:`min-w-0`},Ae={class:`truncate text-base font-semibold text-gray-900`},je={class:`mt-1 text-sm text-gray-500`},b={class:`grid grid-cols-1 gap-4 sm:grid-cols-2`},x={class:`mt-1 text-sm text-gray-900`},S={class:`mt-1 break-all text-sm text-gray-900`},Me={class:`mt-1 text-sm text-gray-900`},Ne={class:`mt-1 text-sm text-gray-900`},Pe={class:`mt-1`},Fe={key:0,class:`inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700`},Ie={key:1,class:`inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-700`},Le={class:`mt-1 text-sm text-gray-900`},Re={class:`flex justify-end border-t border-gray-200 px-5 py-4`},ze={class:`w-full max-w-md rounded-xl bg-white shadow-xl`},Be={class:`flex items-center justify-between border-b border-gray-200 px-5 py-4`},Ve={key:0,class:`rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700`},He={class:`flex justify-end gap-2 pt-2`},Ue=[`disabled`],We=[`disabled`],Ge={key:0,class:`h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white`},C=y({__name:`Index`,setup(y){let C=o(null),w=null,T=o(!1),E=o(!1),D=o(!1),O=o(null),k=o(``),A=o(``),j=o(!1),M=o(!1),N=o(!1),P=o(!1),F=o(!1),I=o(!0),L=o(``),R=o(``),z=o(null),B=o(``),V=o(``),H=o(``),U=o(``),W=o(null),G=o(!1),K=()=>{L.value=``,R.value=``},Ke=async()=>{await re(),C.value&&(w&&=(w.destroy(),null),I.value=!0,w=new window.DataTable(C.value,{processing:!0,serverSide:!0,searching:!0,ordering:!0,paging:!0,info:!0,autoWidth:!1,pageLength:10,lengthMenu:[[10,25,50,100],[10,25,50,100]],ajax:{url:`/admin/users/data`,type:`GET`,dataSrc:function(e){return I.value=!1,Array.isArray(e?.data)?e.data:[]},error:function(e){I.value=!1,console.error(`DataTables error:`,e.responseText)}},initComplete:function(){I.value=!1},drawCallback:function(){I.value=!1},columns:[{data:null,title:`Pengguna`,orderable:!0,searchable:!0,render:(e,t,n)=>{let r=[n.firstName,n.lastName].filter(Boolean).join(` `).trim()||n.name||n.username||`User`,i=n.username||`-`;return`
                        <div class="flex items-center gap-3">
                            <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-gray-600">
                                ${r.trim().charAt(0).toUpperCase()}
                            </div>

                            <div class="min-w-0">
                                <div class="truncate text-sm font-semibold text-gray-900">
                                    ${r}
                                </div>

                                <div class="mt-0.5 truncate text-xs text-gray-500">
                                    @${i}
                                </div>
                            </div>
                        </div>
                    `}},{data:`email`,title:`Email`,orderable:!0,searchable:!0,render:e=>`
                        <span class="text-sm text-gray-600">
                            ${e||`-`}
                        </span>
                    `},{data:`enabled`,title:`Status`,orderable:!0,searchable:!1,render:e=>e?`
                            <span class="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
                                <span class="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                                Aktif
                            </span>
                        `:`
                        <span class="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-700">
                            <span class="h-1.5 w-1.5 rounded-full bg-red-500"></span>
                            Nonaktif
                        </span>
                    `},{data:null,title:`Aksi`,orderable:!1,searchable:!1,render:(e,t,n)=>`
                        <div class="flex items-center justify-end gap-1">
                            <button
                                type="button"
                                data-action="detail"
                                data-id="${n.id}"
                                class="cursor-pointer rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
                                title="Detail"
                            >
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="1.8"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <circle cx="12" cy="12" r="9"/>
                                    <path d="M12 11v5"/>
                                    <path d="M12 8h.01"/>
                                </svg>
                            </button>

                            <button
                                type="button"
                                data-action="edit"
                                data-id="${n.id}"
                                class="cursor-pointer rounded-lg p-2 text-blue-500 transition hover:bg-blue-50 hover:text-blue-700"
                                title="Edit"
                            >
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="1.8"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <path d="M12 20h9"/>
                                    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>
                                </svg>
                            </button>

                            <button
                                type="button"
                                data-action="password"
                                data-id="${n.id}"
                                class="cursor-pointer rounded-lg p-2 text-amber-500 transition hover:bg-amber-50 hover:text-amber-700"
                                title="Reset Password"
                            >
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="1.8"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <circle cx="7.5" cy="15.5" r="5.5"/>
                                    <path d="m21 2-9.6 9.6"/>
                                    <path d="m15.5 7.5 3 3"/>
                                    <path d="m18 5 3 3"/>
                                </svg>
                            </button>

                            <button
                                type="button"
                                data-action="status"
                                data-id="${n.id}"
                                data-enabled="${n.enabled?`1`:`0`}"
                                class="cursor-pointer rounded-lg p-2 ${n.enabled?`text-red-500 hover:bg-red-50 hover:text-red-700`:`text-green-500 hover:bg-green-50 hover:text-green-700`} transition"
                                title="${n.enabled?`Nonaktifkan`:`Aktifkan`}"
                            >
                                ${n.enabled?`
                                            <svg
                                                width="18"
                                                height="18"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                stroke-width="1.8"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            >
                                                <circle cx="12" cy="12" r="9"/>
                                                <path d="M8 12h8"/>
                                            </svg>
                                        `:`
                                            <svg
                                                width="18"
                                                height="18"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                stroke-width="1.8"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            >
                                                <circle cx="12" cy="12" r="9"/>
                                                <path d="M12 8v8"/>
                                                <path d="M8 12h8"/>
                                            </svg>
                                        `}
                            </button>

                            <button
                                type="button"
                                data-action="delete"
                                data-id="${n.id}"
                                class="cursor-pointer rounded-lg p-2 text-red-500 transition hover:bg-red-50 hover:text-red-700"
                                title="Hapus"
                            >
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="1.8"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <path d="M3 6h18"/>
                                    <path d="M8 6V4h8v2"/>
                                    <path d="M19 6l-1 14H6L5 6"/>
                                    <path d="M10 11v5"/>
                                    <path d="M14 11v5"/>
                                </svg>
                            </button>
                        </div>
                    `}],layout:{topStart:`pageLength`,topEnd:`search`,bottomStart:`info`,bottomEnd:`paging`},language:{processing:`
                <div class="datatable-loading">
                    <div class="datatable-spinner"></div>
                    <span>Memuat data...</span>
                </div>
            `,search:``,searchPlaceholder:`Cari pengguna...`,lengthMenu:`_MENU_`,info:`Menampilkan _START_–_END_ dari _TOTAL_ pengguna`,infoEmpty:`Tidak ada pengguna`,infoFiltered:``,zeroRecords:`Pengguna tidak ditemukan`,emptyTable:`Belum ada data pengguna`,paginate:{first:`«`,previous:`‹`,next:`›`,last:`»`}},order:[[0,`asc`]]}),C.value.addEventListener(`click`,q))},q=async e=>{let t=e.target.closest(`button[data-action]`);if(!t)return;let n=t.dataset.action,r=t.dataset.id;if(r){if(n===`detail`){await qe(r);return}if(n===`edit`){Je(r);return}if(n===`password`){Ye(r);return}if(n===`status`){let e=t.dataset.enabled===`1`;X(`status`,r,e);return}n===`delete`&&X(`delete`,r)}},qe=async t=>{K(),j.value=!0,E.value=!0,z.value=null;try{let n=await e.get(`/admin/users/${t}/json`);z.value=n.data.user??n.data}catch(e){E.value=!1,L.value=e.response?.data?.message||`Data pengguna gagal dimuat.`}finally{j.value=!1}},Je=e=>{f.visit(`/admin/users/${e}/edit`)},Ye=e=>{K(),O.value={id:e},k.value=``,A.value=``,T.value=!0},J=()=>{M.value||(T.value=!1,O.value=null,k.value=``,A.value=``)},Y=async()=>{if(K(),O.value?.id){if(!k.value){L.value=`Password wajib diisi.`;return}if(k.value.length<8){L.value=`Password minimal 8 karakter.`;return}if(k.value!==A.value){L.value=`Konfirmasi password tidak sesuai.`;return}M.value=!0;try{let t=await e.post(`/admin/users/${O.value.id}/reset-password`,{password:k.value,password_confirmation:A.value});T.value=!1,O.value=null,k.value=``,A.value=``,R.value=t.data?.message||`Password berhasil direset.`}catch(e){L.value=e.response?.data?.message||`Password gagal direset.`}finally{M.value=!1}}},X=(e,t,n=!1)=>{K(),W.value=t,U.value=e,G.value=n,e===`status`&&(n?(B.value=`Nonaktifkan Pengguna`,V.value=`Pengguna ini akan dinonaktifkan dan tidak dapat masuk ke sistem sampai diaktifkan kembali.`,H.value=`Nonaktifkan`):(B.value=`Aktifkan Pengguna`,V.value=`Pengguna ini akan diaktifkan dan dapat masuk kembali ke sistem.`,H.value=`Aktifkan`)),e===`delete`&&(B.value=`Hapus Pengguna`,V.value=`Pengguna akan dihapus secara permanen dari SSO. Tindakan ini tidak dapat dibatalkan.`,H.value=`Hapus`),D.value=!0},Z=()=>{F.value||(D.value=!1,W.value=null,U.value=``,G.value=!1,B.value=``,V.value=``,H.value=``)},Q=async()=>{if(!W.value)return;let t=W.value,n=U.value;F.value=!0,n===`status`&&(P.value=!0),n===`delete`&&(N.value=!0);try{if(n===`status`){let n=await e.patch(`/admin/users/${t}/status`,{enabled:!G.value});R.value=n.data?.message||`Status pengguna berhasil diperbarui.`}if(n===`delete`){let n=await e.delete(`/admin/users/${t}`);R.value=n.data?.message||`Pengguna berhasil dihapus.`}Z(),w&&w.ajax.reload(null,!1)}catch(e){L.value=e.response?.data?.message||(n===`delete`?`Pengguna gagal dihapus.`:`Status pengguna gagal diperbarui.`),D.value=!1}finally{F.value=!1,P.value=!1,N.value=!1}},$=()=>{j.value||(E.value=!1,z.value=null)},Xe=()=>{f.visit(`/admin/users/create`)},Ze=()=>{f.visit(`/admin/users/import`)};return r(()=>{Ke()}),te(()=>{C.value&&C.value.removeEventListener(`click`,q),w&&=(w.destroy(),null)}),(e,r)=>(c(),u(g,null,[v(ee(ne),{title:`Users`}),v(t,null,{default:n(()=>[h(`div`,ie,[R.value?(c(),u(`div`,ae,[h(`div`,null,a(R.value),1),h(`button`,{type:`button`,class:`cursor-pointer text-green-600 hover:text-green-800`,onClick:r[0]||=e=>R.value=``},` × `)])):d(``,!0),L.value?(c(),u(`div`,oe,[h(`div`,null,a(L.value),1),h(`button`,{type:`button`,class:`cursor-pointer text-red-600 hover:text-red-800`,onClick:r[1]||=e=>L.value=``},` × `)])):d(``,!0),h(`div`,{class:`flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between`},[r[15]||=h(`div`,null,[h(`h1`,{class:`text-2xl font-semibold text-gray-900`},` Users `),h(`p`,{class:`mt-1 text-sm text-gray-500`},` Kelola pengguna yang terdaftar pada SSO. `)],-1),h(`div`,{class:`flex flex-col gap-2 sm:flex-row sm:items-center`},[h(`button`,{type:`button`,class:`inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10`,onClick:Ze},[...r[13]||=[h(`svg`,{width:`18`,height:`18`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,"stroke-width":`1.8`,"stroke-linecap":`round`,"stroke-linejoin":`round`},[h(`path`,{d:`M12 3v12`}),h(`path`,{d:`m7 10 5 5 5-5`}),h(`path`,{d:`M5 21h14`})],-1),_(` Import User `,-1)]]),h(`button`,{type:`button`,class:`inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900/20`,onClick:Xe},[...r[14]||=[h(`svg`,{width:`18`,height:`18`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,"stroke-width":`2`,"stroke-linecap":`round`,"stroke-linejoin":`round`},[h(`path`,{d:`M12 5v14`}),h(`path`,{d:`M5 12h14`})],-1),_(` Tambah User `,-1)]])])]),h(`div`,se,[h(`div`,ce,[h(`div`,le,[h(`table`,{ref_key:`table`,ref:C,id:`users-table`,class:`w-full`},[...r[16]||=[h(`thead`,null,[h(`tr`,null,[h(`th`,null,` Pengguna `),h(`th`,null,` Email `),h(`th`,null,` Status `),h(`th`,null,` Aksi `)])],-1),h(`tbody`,null,null,-1)]],512),I.value?(c(),u(`div`,ue,[(c(),u(g,null,i(8,e=>h(`div`,{key:e,class:`h-[68px] border-b border-gray-100 px-4`},[...r[17]||=[h(`div`,{class:`flex h-full items-center gap-4`},[h(`div`,{class:`flex min-w-0 flex-1 items-center gap-3`},[h(`div`,{class:`skeleton-shimmer h-10 w-10 shrink-0 rounded-full`}),h(`div`,{class:`min-w-0 flex-1 space-y-2`},[h(`div`,{class:`skeleton-shimmer h-3.5 w-36 rounded`}),h(`div`,{class:`skeleton-shimmer h-3 w-24 rounded`})])]),h(`div`,{class:`hidden flex-[0.65] md:block`},[h(`div`,{class:`skeleton-shimmer h-3.5 w-48 rounded`})]),h(`div`,{class:`hidden w-[110px] sm:block`},[h(`div`,{class:`skeleton-shimmer h-6 w-20 rounded-full`})]),h(`div`,{class:`flex w-[190px] shrink-0 justify-end gap-1`},[h(`div`,{class:`skeleton-shimmer h-8 w-8 rounded-lg`}),h(`div`,{class:`skeleton-shimmer h-8 w-8 rounded-lg`}),h(`div`,{class:`skeleton-shimmer h-8 w-8 rounded-lg`}),h(`div`,{class:`skeleton-shimmer h-8 w-8 rounded-lg`}),h(`div`,{class:`skeleton-shimmer h-8 w-8 rounded-lg`})])],-1)]])),64))])):d(``,!0)])])])]),D.value?(c(),u(`div`,{key:0,class:`fixed inset-0 z-99999 flex items-center justify-center bg-black/40 p-4`,onClick:m(Z,[`self`])},[h(`div`,de,[h(`div`,fe,[h(`div`,{class:s([`flex h-12 w-12 items-center justify-center rounded-full`,U.value===`delete`?`bg-red-50 text-red-600`:G.value?`bg-amber-50 text-amber-600`:`bg-green-50 text-green-600`])},[U.value===`delete`?(c(),u(`svg`,pe,[...r[18]||=[h(`path`,{d:`M3 6h18`},null,-1),h(`path`,{d:`M8 6V4h8v2`},null,-1),h(`path`,{d:`M19 6l-1 14H6L5 6`},null,-1),h(`path`,{d:`M10 11v5`},null,-1),h(`path`,{d:`M14 11v5`},null,-1)]])):G.value?(c(),u(`svg`,me,[...r[19]||=[h(`circle`,{cx:`12`,cy:`12`,r:`9`},null,-1),h(`path`,{d:`M8 12h8`},null,-1)]])):(c(),u(`svg`,he,[...r[20]||=[h(`circle`,{cx:`12`,cy:`12`,r:`9`},null,-1),h(`path`,{d:`M12 8v8`},null,-1),h(`path`,{d:`M8 12h8`},null,-1)]]))],2),h(`h2`,ge,a(B.value),1),h(`p`,_e,a(V.value),1)]),h(`div`,ve,[h(`button`,{type:`button`,class:`cursor-pointer rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50`,disabled:F.value,onClick:r[2]||=(...e)=>Z&&Z(...e)},` Batal `,8,ye),h(`button`,{type:`button`,class:s([`inline-flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-white transition disabled:cursor-not-allowed disabled:opacity-50`,U.value===`delete`?`bg-red-600 hover:bg-red-700`:G.value?`bg-amber-600 hover:bg-amber-700`:`bg-green-600 hover:bg-green-700`]),disabled:F.value,onClick:r[3]||=(...e)=>Q&&Q(...e)},[F.value?(c(),u(`span`,xe)):d(``,!0),_(` `+a(F.value?`Memproses...`:H.value),1)],10,be)])])])):d(``,!0),E.value?(c(),u(`div`,{key:1,class:`fixed inset-0 z-99999 flex items-center justify-center bg-black/40 p-4`,onClick:r[6]||=m((...e)=>$&&$(...e),[`self`])},[h(`div`,Se,[h(`div`,Ce,[r[22]||=h(`div`,null,[h(`h2`,{class:`text-lg font-semibold text-gray-900`},` Detail Pengguna `),h(`p`,{class:`mt-1 text-sm text-gray-500`},` Informasi pengguna dari SSO. `)],-1),h(`button`,{type:`button`,class:`cursor-pointer rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700`,onClick:r[4]||=(...e)=>$&&$(...e)},[...r[21]||=[h(`svg`,{width:`20`,height:`20`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,"stroke-width":`2`,"stroke-linecap":`round`,"stroke-linejoin":`round`},[h(`path`,{d:`M18 6 6 18`}),h(`path`,{d:`m6 6 12 12`})],-1)]])]),h(`div`,we,[j.value?(c(),u(`div`,Te,[...r[23]||=[h(`div`,{class:`h-6 w-6 animate-spin rounded-full border-2 border-gray-200 border-t-gray-800`},null,-1)]])):z.value?(c(),u(`div`,Ee,[h(`div`,De,[h(`div`,Oe,a(([z.value.firstName,z.value.lastName].filter(Boolean).join(` `)||z.value.name||z.value.username||`U`).charAt(0).toUpperCase()),1),h(`div`,ke,[h(`div`,Ae,a([z.value.firstName,z.value.lastName].filter(Boolean).join(` `)||z.value.name||z.value.username||`-`),1),h(`div`,je,` @`+a(z.value.username||`-`),1)])]),h(`div`,b,[h(`div`,null,[r[24]||=h(`div`,{class:`text-xs font-medium uppercase tracking-wide text-gray-400`},` Username `,-1),h(`div`,x,a(z.value.username||`-`),1)]),h(`div`,null,[r[25]||=h(`div`,{class:`text-xs font-medium uppercase tracking-wide text-gray-400`},` Email `,-1),h(`div`,S,a(z.value.email||`-`),1)]),h(`div`,null,[r[26]||=h(`div`,{class:`text-xs font-medium uppercase tracking-wide text-gray-400`},` Nama Depan `,-1),h(`div`,Me,a(z.value.firstName||`-`),1)]),h(`div`,null,[r[27]||=h(`div`,{class:`text-xs font-medium uppercase tracking-wide text-gray-400`},` Nama Belakang `,-1),h(`div`,Ne,a(z.value.lastName||`-`),1)]),h(`div`,null,[r[30]||=h(`div`,{class:`text-xs font-medium uppercase tracking-wide text-gray-400`},` Status `,-1),h(`div`,Pe,[z.value.enabled?(c(),u(`span`,Fe,[...r[28]||=[h(`span`,{class:`h-1.5 w-1.5 rounded-full bg-green-500`},null,-1),_(` Aktif `,-1)]])):(c(),u(`span`,Ie,[...r[29]||=[h(`span`,{class:`h-1.5 w-1.5 rounded-full bg-red-500`},null,-1),_(` Nonaktif `,-1)]]))])]),h(`div`,null,[r[31]||=h(`div`,{class:`text-xs font-medium uppercase tracking-wide text-gray-400`},` Email Terverifikasi `,-1),h(`div`,Le,a(z.value.emailVerified?`Ya`:`Tidak`),1)])])])):d(``,!0)]),h(`div`,Re,[h(`button`,{type:`button`,class:`cursor-pointer rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50`,onClick:r[5]||=(...e)=>$&&$(...e)},` Tutup `)])])])):d(``,!0),T.value?(c(),u(`div`,{key:2,class:`fixed inset-0 z-99999 flex items-center justify-center bg-black/40 p-4`,onClick:r[12]||=m((...e)=>J&&J(...e),[`self`])},[h(`div`,ze,[h(`div`,Be,[r[33]||=h(`div`,null,[h(`h2`,{class:`text-lg font-semibold text-gray-900`},` Reset Password `),h(`p`,{class:`mt-1 text-sm text-gray-500`},` Masukkan password baru pengguna. `)],-1),h(`button`,{type:`button`,class:`cursor-pointer rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700`,onClick:r[7]||=(...e)=>J&&J(...e)},[...r[32]||=[h(`svg`,{width:`20`,height:`20`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,"stroke-width":`2`,"stroke-linecap":`round`,"stroke-linejoin":`round`},[h(`path`,{d:`M18 6 6 18`}),h(`path`,{d:`m6 6 12 12`})],-1)]])]),h(`form`,{class:`space-y-4 px-5 py-5`,onSubmit:r[11]||=m((...e)=>Y&&Y(...e),[`prevent`])},[h(`div`,null,[r[34]||=h(`label`,{class:`mb-1.5 block text-sm font-medium text-gray-700`},` Password Baru `,-1),p(h(`input`,{"onUpdate:modelValue":r[8]||=e=>k.value=e,type:`password`,autocomplete:`new-password`,class:`h-10 w-full rounded-lg border border-gray-300 px-3 text-sm text-gray-900 outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-500/10`,placeholder:`Minimal 8 karakter`},null,512),[[l,k.value]])]),h(`div`,null,[r[35]||=h(`label`,{class:`mb-1.5 block text-sm font-medium text-gray-700`},` Konfirmasi Password `,-1),p(h(`input`,{"onUpdate:modelValue":r[9]||=e=>A.value=e,type:`password`,autocomplete:`new-password`,class:`h-10 w-full rounded-lg border border-gray-300 px-3 text-sm text-gray-900 outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-500/10`,placeholder:`Ulangi password baru`},null,512),[[l,A.value]])]),L.value?(c(),u(`div`,Ve,a(L.value),1)):d(``,!0),h(`div`,He,[h(`button`,{type:`button`,class:`cursor-pointer rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50`,disabled:M.value,onClick:r[10]||=(...e)=>J&&J(...e)},` Batal `,8,Ue),h(`button`,{type:`submit`,class:`inline-flex cursor-pointer items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50`,disabled:M.value},[M.value?(c(),u(`span`,Ge)):d(``,!0),_(` `+a(M.value?`Menyimpan...`:`Reset Password`),1)],8,We)])],32)])])):d(``,!0)]),_:1})],64))}},[[`__scopeId`,`data-v-feb105bd`]]);export{C as default};