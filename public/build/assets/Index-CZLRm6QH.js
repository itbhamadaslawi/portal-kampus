import{n as e,t}from"./DashboardLayout-UQYlUSlH.js";import{C as n,D as r,E as i,F as a,L as o,M as s,N as c,P as l,S as ee,_ as u,b as d,d as f,g as p,i as m,j as te,l as h,m as g,t as ne,u as _,w as v,y}from"./app-CTX27gk5.js";import{t as b}from"./_plugin-vue_export-helper-BDNMzG2s.js";var x={class:`space-y-4`},S={key:0,class:`rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700`},C={class:`grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3`},w={class:`rounded-2xl border border-gray-200 bg-white p-5 shadow-sm`},T={class:`mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5`},E={class:`grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3`},D={class:`rounded-2xl border border-gray-200 bg-white p-5 shadow-sm`},O={class:`flex items-center justify-between`},k={class:`mt-2 text-3xl font-bold text-gray-800`},A={class:`rounded-2xl border border-gray-200 bg-white p-5 shadow-sm`},j={class:`flex items-center justify-between`},M={class:`mt-2 text-3xl font-bold text-emerald-600`},N={class:`rounded-2xl border border-gray-200 bg-white p-5 shadow-sm`},P={class:`flex items-center justify-between`},F={class:`mt-2 text-3xl font-bold text-red-600`},I={class:`rounded-2xl border border-gray-200 bg-white p-5 shadow-sm`},L={key:0,class:`mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5`},R=[`title`],z={class:`mt-2 text-2xl font-bold text-gray-800`},B={key:1,class:`mt-5 rounded-xl border border-dashed border-gray-300 px-4 py-8 text-center text-sm text-gray-500`},re=b({__name:`UserSummary`,setup(t){let n=c(!0),a=c(``),s=c({total:0,active:0,inactive:0,groups:[]}),l=async()=>{n.value=!0,a.value=``;try{let t=await e.get(`/admin/users/summary`,{headers:{Accept:`application/json`,"X-Requested-With":`XMLHttpRequest`}});s.value={total:t.data?.total??0,active:t.data?.active??0,inactive:t.data?.inactive??0,groups:Array.isArray(t.data?.groups)?t.data.groups:[]}}catch(e){a.value=e.response?.data?.message||`Resume user gagal dimuat.`}finally{n.value=!1}};return v(()=>{l()}),(e,t)=>(i(),u(`div`,x,[a.value?(i(),u(`div`,S,o(a.value),1)):p(``,!0),n.value?(i(),u(f,{key:1},[g(`div`,C,[(i(),u(f,null,r(3,e=>g(`div`,{key:e,class:`skeleton-shimmer h-28 rounded-2xl`})),64))]),g(`div`,w,[t[0]||=g(`div`,{class:`skeleton-shimmer h-6 w-48 rounded`},null,-1),g(`div`,T,[(i(),u(f,null,r(10,e=>g(`div`,{key:e,class:`skeleton-shimmer h-20 rounded-xl`})),64))])])],64)):(i(),u(f,{key:2},[g(`div`,E,[g(`div`,D,[g(`div`,O,[g(`div`,null,[t[1]||=g(`p`,{class:`text-sm font-medium text-gray-500`},` Total User `,-1),g(`p`,k,o(s.value.total),1)]),t[2]||=g(`div`,{class:`flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600`},[g(`svg`,{xmlns:`http://www.w3.org/2000/svg`,class:`h-6 w-6`,fill:`none`,viewBox:`0 0 24 24`,stroke:`currentColor`,"stroke-width":`1.8`},[g(`path`,{"stroke-linecap":`round`,"stroke-linejoin":`round`,d:`M15 19a4 4 0 00-8 0m12-8a4 4 0 11-8 0 4 4 0 018 0z`})])],-1)])]),g(`div`,A,[g(`div`,j,[g(`div`,null,[t[3]||=g(`p`,{class:`text-sm font-medium text-gray-500`},` User Aktif `,-1),g(`p`,M,o(s.value.active),1)]),t[4]||=g(`div`,{class:`flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600`},[g(`svg`,{xmlns:`http://www.w3.org/2000/svg`,class:`h-6 w-6`,fill:`none`,viewBox:`0 0 24 24`,stroke:`currentColor`,"stroke-width":`1.8`},[g(`path`,{"stroke-linecap":`round`,"stroke-linejoin":`round`,d:`M5 13l4 4L19 7`})])],-1)])]),g(`div`,N,[g(`div`,P,[g(`div`,null,[t[5]||=g(`p`,{class:`text-sm font-medium text-gray-500`},` User Nonaktif `,-1),g(`p`,F,o(s.value.inactive),1)]),t[6]||=g(`div`,{class:`flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600`},[g(`svg`,{xmlns:`http://www.w3.org/2000/svg`,class:`h-6 w-6`,fill:`none`,viewBox:`0 0 24 24`,stroke:`currentColor`,"stroke-width":`1.8`},[g(`path`,{"stroke-linecap":`round`,"stroke-linejoin":`round`,d:`M6 18L18 6M6 6l12 12`})])],-1)])])]),g(`div`,I,[t[8]||=g(`div`,null,[g(`h2`,{class:`text-base font-semibold text-gray-800`},` User Berdasarkan Group `),g(`p`,{class:`mt-1 text-sm text-gray-500`},` Jumlah user berdasarkan group Keycloak. `)],-1),s.value.groups.length?(i(),u(`div`,L,[(i(!0),u(f,null,r(s.value.groups,e=>(i(),u(`div`,{key:e.path,class:`rounded-xl border border-gray-200 bg-gray-50 p-4`},[g(`p`,{class:`truncate text-xs font-medium text-gray-500`,title:e.path},o(e.path),9,R),g(`p`,z,o(e.total),1),t[7]||=g(`p`,{class:`mt-1 text-xs text-gray-500`},` user `,-1)]))),128))])):(i(),u(`div`,B,` Belum ada data group. `))])],64))]))}},[[`__scopeId`,`data-v-a6fa73be`]]),ie={class:`w-full min-w-0 space-y-6`},ae={key:0,class:`flex items-start justify-between gap-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700`},oe={key:1,class:`flex items-start justify-between gap-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700`},se={class:`w-full min-w-0 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm`},ce={class:`w-full min-w-0 px-4 py-4 sm:px-6`},le={class:`users-table-wrapper relative w-full min-w-0`},ue={key:0,class:`pointer-events-none absolute inset-x-0 top-[56px] z-30 min-h-[520px] overflow-hidden bg-white`},de={class:`w-full max-w-md overflow-hidden rounded-xl bg-white shadow-2xl`},fe={class:`px-6 pt-6`},V={key:0,width:`24`,height:`24`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,"stroke-width":`1.8`,"stroke-linecap":`round`,"stroke-linejoin":`round`},pe={key:1,width:`24`,height:`24`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,"stroke-width":`1.8`,"stroke-linecap":`round`,"stroke-linejoin":`round`},me={key:2,width:`24`,height:`24`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,"stroke-width":`1.8`,"stroke-linecap":`round`,"stroke-linejoin":`round`},he={class:`mt-4 text-lg font-semibold text-gray-900`},ge={class:`mt-2 text-sm leading-6 text-gray-500`},_e={class:`flex justify-end gap-2 px-6 py-5`},ve=[`disabled`],ye=[`disabled`],be={key:0,class:`h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white`},xe={class:`w-full max-w-lg rounded-xl bg-white shadow-xl`},Se={class:`flex items-center justify-between border-b border-gray-200 px-5 py-4`},Ce={class:`px-5 py-5`},we={key:0,class:`flex items-center justify-center py-10`},Te={key:1,class:`space-y-4`},Ee={class:`flex items-center gap-4`},De={class:`flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-lg font-semibold text-gray-600`},Oe={class:`min-w-0`},ke={class:`truncate text-base font-semibold text-gray-900`},Ae={class:`mt-1 text-sm text-gray-500`},H={class:`grid grid-cols-1 gap-4 sm:grid-cols-2`},je={class:`mt-1 text-sm text-gray-900`},Me={class:`mt-1 break-all text-sm text-gray-900`},Ne={class:`mt-1 text-sm text-gray-900`},Pe={class:`mt-1 text-sm text-gray-900`},Fe={class:`mt-1`},Ie={key:0,class:`inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700`},Le={key:1,class:`inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-700`},Re={class:`mt-1 text-sm text-gray-900`},ze={class:`flex justify-end border-t border-gray-200 px-5 py-4`},Be={class:`w-full max-w-md rounded-xl bg-white shadow-xl`},Ve={class:`flex items-center justify-between border-b border-gray-200 px-5 py-4`},He={key:0,class:`rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700`},Ue={class:`flex justify-end gap-2 pt-2`},We=[`disabled`],Ge=[`disabled`],Ke={key:0,class:`h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white`},U=b({__name:`Index`,setup(b){let x=c(null),S=null,C=c(!1),w=c(!1),T=c(!1),E=c(null),D=c(``),O=c(``),k=c(!1),A=c(!1),j=c(!1),M=c(!1),N=c(!1),P=c(!0),F=c(``),I=c(``),L=c(null),R=c(``),z=c(``),B=c(``),U=c(``),W=c(null),G=c(!1),K=()=>{F.value=``,I.value=``},qe=async()=>{await ee(),x.value&&(S&&=(S.destroy(),null),P.value=!0,S=new window.DataTable(x.value,{processing:!0,serverSide:!0,searching:!0,ordering:!0,paging:!0,info:!0,autoWidth:!1,pageLength:10,lengthMenu:[[10,25,50,100],[10,25,50,100]],ajax:{url:`/admin/users/data`,type:`GET`,dataSrc:function(e){return P.value=!1,Array.isArray(e?.data)?e.data:[]},error:function(e){P.value=!1,console.error(`DataTables error:`,e.responseText)}},initComplete:function(){P.value=!1},drawCallback:function(){P.value=!1},columns:[{data:null,title:`Pengguna`,orderable:!0,searchable:!0,render:(e,t,n)=>{let r=[n.firstName,n.lastName].filter(Boolean).join(` `).trim()||n.name||n.username||`User`,i=n.username||`-`;return`
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
            `,search:``,searchPlaceholder:`Cari pengguna...`,lengthMenu:`_MENU_`,info:`Menampilkan _START_–_END_ dari _TOTAL_ pengguna`,infoEmpty:`Tidak ada pengguna`,infoFiltered:``,zeroRecords:`Pengguna tidak ditemukan`,emptyTable:`Belum ada data pengguna`,paginate:{first:`«`,previous:`‹`,next:`›`,last:`»`}},order:[[0,`asc`]]}),x.value.addEventListener(`click`,q))},q=async e=>{let t=e.target.closest(`button[data-action]`);if(!t)return;let n=t.dataset.action,r=t.dataset.id;if(r){if(n===`detail`){await Je(r);return}if(n===`edit`){Ye(r);return}if(n===`password`){Xe(r);return}if(n===`status`){let e=t.dataset.enabled===`1`;X(`status`,r,e);return}n===`delete`&&X(`delete`,r)}},Je=async t=>{K(),k.value=!0,w.value=!0,L.value=null;try{let n=await e.get(`/admin/users/${t}/json`);L.value=n.data.user??n.data}catch(e){w.value=!1,F.value=e.response?.data?.message||`Data pengguna gagal dimuat.`}finally{k.value=!1}},Ye=e=>{m.visit(`/admin/users/${e}/edit`)},Xe=e=>{K(),E.value={id:e},D.value=``,O.value=``,C.value=!0},J=()=>{A.value||(C.value=!1,E.value=null,D.value=``,O.value=``)},Y=async()=>{if(K(),E.value?.id){if(!D.value){F.value=`Password wajib diisi.`;return}if(D.value.length<8){F.value=`Password minimal 8 karakter.`;return}if(D.value!==O.value){F.value=`Konfirmasi password tidak sesuai.`;return}A.value=!0;try{let t=await e.post(`/admin/users/${E.value.id}/reset-password`,{password:D.value,password_confirmation:O.value});C.value=!1,E.value=null,D.value=``,O.value=``,I.value=t.data?.message||`Password berhasil direset.`}catch(e){F.value=e.response?.data?.message||`Password gagal direset.`}finally{A.value=!1}}},X=(e,t,n=!1)=>{K(),W.value=t,U.value=e,G.value=n,e===`status`&&(n?(R.value=`Nonaktifkan Pengguna`,z.value=`Pengguna ini akan dinonaktifkan dan tidak dapat masuk ke sistem sampai diaktifkan kembali.`,B.value=`Nonaktifkan`):(R.value=`Aktifkan Pengguna`,z.value=`Pengguna ini akan diaktifkan dan dapat masuk kembali ke sistem.`,B.value=`Aktifkan`)),e===`delete`&&(R.value=`Hapus Pengguna`,z.value=`Pengguna akan dihapus secara permanen dari SSO. Tindakan ini tidak dapat dibatalkan.`,B.value=`Hapus`),T.value=!0},Z=()=>{N.value||(T.value=!1,W.value=null,U.value=``,G.value=!1,R.value=``,z.value=``,B.value=``)},Q=async()=>{if(!W.value)return;let t=W.value,n=U.value;N.value=!0,n===`status`&&(M.value=!0),n===`delete`&&(j.value=!0);try{if(n===`status`){let n=await e.patch(`/admin/users/${t}/status`,{enabled:!G.value});I.value=n.data?.message||`Status pengguna berhasil diperbarui.`}if(n===`delete`){let n=await e.delete(`/admin/users/${t}`);I.value=n.data?.message||`Pengguna berhasil dihapus.`}Z(),S&&S.ajax.reload(null,!1)}catch(e){F.value=e.response?.data?.message||(n===`delete`?`Pengguna gagal dihapus.`:`Status pengguna gagal diperbarui.`),T.value=!1}finally{N.value=!1,M.value=!1,j.value=!1}},$=()=>{k.value||(w.value=!1,L.value=null)},Ze=()=>{m.visit(`/admin/users/create`)},Qe=()=>{m.visit(`/admin/users/import`)};return v(()=>{qe()}),n(()=>{x.value&&x.value.removeEventListener(`click`,q),S&&=(S.destroy(),null)}),(e,n)=>(i(),u(f,null,[d(l(ne),{title:`Users`}),d(t,null,{default:te(()=>[g(`div`,ie,[I.value?(i(),u(`div`,ae,[g(`div`,null,o(I.value),1),g(`button`,{type:`button`,class:`cursor-pointer text-green-600 hover:text-green-800`,onClick:n[0]||=e=>I.value=``},` × `)])):p(``,!0),F.value?(i(),u(`div`,oe,[g(`div`,null,o(F.value),1),g(`button`,{type:`button`,class:`cursor-pointer text-red-600 hover:text-red-800`,onClick:n[1]||=e=>F.value=``},` × `)])):p(``,!0),g(`div`,{class:`flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between`},[n[15]||=g(`div`,null,[g(`h1`,{class:`text-2xl font-semibold text-gray-900`},` Users `),g(`p`,{class:`mt-1 text-sm text-gray-500`},` Kelola pengguna yang terdaftar pada SSO. `)],-1),g(`div`,{class:`flex flex-col gap-2 sm:flex-row sm:items-center`},[g(`button`,{type:`button`,class:`inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10`,onClick:Qe},[...n[13]||=[g(`svg`,{width:`18`,height:`18`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,"stroke-width":`1.8`,"stroke-linecap":`round`,"stroke-linejoin":`round`},[g(`path`,{d:`M12 3v12`}),g(`path`,{d:`m7 10 5 5 5-5`}),g(`path`,{d:`M5 21h14`})],-1),y(` Import User `,-1)]]),g(`button`,{type:`button`,class:`inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900/20`,onClick:Ze},[...n[14]||=[g(`svg`,{width:`18`,height:`18`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,"stroke-width":`2`,"stroke-linecap":`round`,"stroke-linejoin":`round`},[g(`path`,{d:`M12 5v14`}),g(`path`,{d:`M5 12h14`})],-1),y(` Tambah User `,-1)]])])]),d(re),g(`div`,se,[g(`div`,ce,[g(`div`,le,[g(`table`,{ref_key:`table`,ref:x,id:`users-table`,class:`w-full`},[...n[16]||=[g(`thead`,null,[g(`tr`,null,[g(`th`,null,` Pengguna `),g(`th`,null,` Email `),g(`th`,null,` Status `),g(`th`,null,` Aksi `)])],-1),g(`tbody`,null,null,-1)]],512),P.value?(i(),u(`div`,ue,[(i(),u(f,null,r(8,e=>g(`div`,{key:e,class:`h-[68px] border-b border-gray-100 px-4`},[...n[17]||=[g(`div`,{class:`flex h-full items-center gap-4`},[g(`div`,{class:`flex min-w-0 flex-1 items-center gap-3`},[g(`div`,{class:`skeleton-shimmer h-10 w-10 shrink-0 rounded-full`}),g(`div`,{class:`min-w-0 flex-1 space-y-2`},[g(`div`,{class:`skeleton-shimmer h-3.5 w-36 rounded`}),g(`div`,{class:`skeleton-shimmer h-3 w-24 rounded`})])]),g(`div`,{class:`hidden flex-[0.65] md:block`},[g(`div`,{class:`skeleton-shimmer h-3.5 w-48 rounded`})]),g(`div`,{class:`hidden w-[110px] sm:block`},[g(`div`,{class:`skeleton-shimmer h-6 w-20 rounded-full`})]),g(`div`,{class:`flex w-[190px] shrink-0 justify-end gap-1`},[g(`div`,{class:`skeleton-shimmer h-8 w-8 rounded-lg`}),g(`div`,{class:`skeleton-shimmer h-8 w-8 rounded-lg`}),g(`div`,{class:`skeleton-shimmer h-8 w-8 rounded-lg`}),g(`div`,{class:`skeleton-shimmer h-8 w-8 rounded-lg`}),g(`div`,{class:`skeleton-shimmer h-8 w-8 rounded-lg`})])],-1)]])),64))])):p(``,!0)])])])]),T.value?(i(),u(`div`,{key:0,class:`fixed inset-0 z-99999 flex items-center justify-center bg-black/40 p-4`,onClick:_(Z,[`self`])},[g(`div`,de,[g(`div`,fe,[g(`div`,{class:a([`flex h-12 w-12 items-center justify-center rounded-full`,U.value===`delete`?`bg-red-50 text-red-600`:G.value?`bg-amber-50 text-amber-600`:`bg-green-50 text-green-600`])},[U.value===`delete`?(i(),u(`svg`,V,[...n[18]||=[g(`path`,{d:`M3 6h18`},null,-1),g(`path`,{d:`M8 6V4h8v2`},null,-1),g(`path`,{d:`M19 6l-1 14H6L5 6`},null,-1),g(`path`,{d:`M10 11v5`},null,-1),g(`path`,{d:`M14 11v5`},null,-1)]])):G.value?(i(),u(`svg`,pe,[...n[19]||=[g(`circle`,{cx:`12`,cy:`12`,r:`9`},null,-1),g(`path`,{d:`M8 12h8`},null,-1)]])):(i(),u(`svg`,me,[...n[20]||=[g(`circle`,{cx:`12`,cy:`12`,r:`9`},null,-1),g(`path`,{d:`M12 8v8`},null,-1),g(`path`,{d:`M8 12h8`},null,-1)]]))],2),g(`h2`,he,o(R.value),1),g(`p`,ge,o(z.value),1)]),g(`div`,_e,[g(`button`,{type:`button`,class:`cursor-pointer rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50`,disabled:N.value,onClick:n[2]||=(...e)=>Z&&Z(...e)},` Batal `,8,ve),g(`button`,{type:`button`,class:a([`inline-flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-white transition disabled:cursor-not-allowed disabled:opacity-50`,U.value===`delete`?`bg-red-600 hover:bg-red-700`:G.value?`bg-amber-600 hover:bg-amber-700`:`bg-green-600 hover:bg-green-700`]),disabled:N.value,onClick:n[3]||=(...e)=>Q&&Q(...e)},[N.value?(i(),u(`span`,be)):p(``,!0),y(` `+o(N.value?`Memproses...`:B.value),1)],10,ye)])])])):p(``,!0),w.value?(i(),u(`div`,{key:1,class:`fixed inset-0 z-99999 flex items-center justify-center bg-black/40 p-4`,onClick:n[6]||=_((...e)=>$&&$(...e),[`self`])},[g(`div`,xe,[g(`div`,Se,[n[22]||=g(`div`,null,[g(`h2`,{class:`text-lg font-semibold text-gray-900`},` Detail Pengguna `),g(`p`,{class:`mt-1 text-sm text-gray-500`},` Informasi pengguna dari SSO. `)],-1),g(`button`,{type:`button`,class:`cursor-pointer rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700`,onClick:n[4]||=(...e)=>$&&$(...e)},[...n[21]||=[g(`svg`,{width:`20`,height:`20`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,"stroke-width":`2`,"stroke-linecap":`round`,"stroke-linejoin":`round`},[g(`path`,{d:`M18 6 6 18`}),g(`path`,{d:`m6 6 12 12`})],-1)]])]),g(`div`,Ce,[k.value?(i(),u(`div`,we,[...n[23]||=[g(`div`,{class:`h-6 w-6 animate-spin rounded-full border-2 border-gray-200 border-t-gray-800`},null,-1)]])):L.value?(i(),u(`div`,Te,[g(`div`,Ee,[g(`div`,De,o(([L.value.firstName,L.value.lastName].filter(Boolean).join(` `)||L.value.name||L.value.username||`U`).charAt(0).toUpperCase()),1),g(`div`,Oe,[g(`div`,ke,o([L.value.firstName,L.value.lastName].filter(Boolean).join(` `)||L.value.name||L.value.username||`-`),1),g(`div`,Ae,` @`+o(L.value.username||`-`),1)])]),g(`div`,H,[g(`div`,null,[n[24]||=g(`div`,{class:`text-xs font-medium uppercase tracking-wide text-gray-400`},` Username `,-1),g(`div`,je,o(L.value.username||`-`),1)]),g(`div`,null,[n[25]||=g(`div`,{class:`text-xs font-medium uppercase tracking-wide text-gray-400`},` Email `,-1),g(`div`,Me,o(L.value.email||`-`),1)]),g(`div`,null,[n[26]||=g(`div`,{class:`text-xs font-medium uppercase tracking-wide text-gray-400`},` Nama Depan `,-1),g(`div`,Ne,o(L.value.firstName||`-`),1)]),g(`div`,null,[n[27]||=g(`div`,{class:`text-xs font-medium uppercase tracking-wide text-gray-400`},` Nama Belakang `,-1),g(`div`,Pe,o(L.value.lastName||`-`),1)]),g(`div`,null,[n[30]||=g(`div`,{class:`text-xs font-medium uppercase tracking-wide text-gray-400`},` Status `,-1),g(`div`,Fe,[L.value.enabled?(i(),u(`span`,Ie,[...n[28]||=[g(`span`,{class:`h-1.5 w-1.5 rounded-full bg-green-500`},null,-1),y(` Aktif `,-1)]])):(i(),u(`span`,Le,[...n[29]||=[g(`span`,{class:`h-1.5 w-1.5 rounded-full bg-red-500`},null,-1),y(` Nonaktif `,-1)]]))])]),g(`div`,null,[n[31]||=g(`div`,{class:`text-xs font-medium uppercase tracking-wide text-gray-400`},` Email Terverifikasi `,-1),g(`div`,Re,o(L.value.emailVerified?`Ya`:`Tidak`),1)])])])):p(``,!0)]),g(`div`,ze,[g(`button`,{type:`button`,class:`cursor-pointer rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50`,onClick:n[5]||=(...e)=>$&&$(...e)},` Tutup `)])])])):p(``,!0),C.value?(i(),u(`div`,{key:2,class:`fixed inset-0 z-99999 flex items-center justify-center bg-black/40 p-4`,onClick:n[12]||=_((...e)=>J&&J(...e),[`self`])},[g(`div`,Be,[g(`div`,Ve,[n[33]||=g(`div`,null,[g(`h2`,{class:`text-lg font-semibold text-gray-900`},` Reset Password `),g(`p`,{class:`mt-1 text-sm text-gray-500`},` Masukkan password baru pengguna. `)],-1),g(`button`,{type:`button`,class:`cursor-pointer rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700`,onClick:n[7]||=(...e)=>J&&J(...e)},[...n[32]||=[g(`svg`,{width:`20`,height:`20`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,"stroke-width":`2`,"stroke-linecap":`round`,"stroke-linejoin":`round`},[g(`path`,{d:`M18 6 6 18`}),g(`path`,{d:`m6 6 12 12`})],-1)]])]),g(`form`,{class:`space-y-4 px-5 py-5`,onSubmit:n[11]||=_((...e)=>Y&&Y(...e),[`prevent`])},[g(`div`,null,[n[34]||=g(`label`,{class:`mb-1.5 block text-sm font-medium text-gray-700`},` Password Baru `,-1),s(g(`input`,{"onUpdate:modelValue":n[8]||=e=>D.value=e,type:`password`,autocomplete:`new-password`,class:`h-10 w-full rounded-lg border border-gray-300 px-3 text-sm text-gray-900 outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-500/10`,placeholder:`Minimal 8 karakter`},null,512),[[h,D.value]])]),g(`div`,null,[n[35]||=g(`label`,{class:`mb-1.5 block text-sm font-medium text-gray-700`},` Konfirmasi Password `,-1),s(g(`input`,{"onUpdate:modelValue":n[9]||=e=>O.value=e,type:`password`,autocomplete:`new-password`,class:`h-10 w-full rounded-lg border border-gray-300 px-3 text-sm text-gray-900 outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-500/10`,placeholder:`Ulangi password baru`},null,512),[[h,O.value]])]),F.value?(i(),u(`div`,He,o(F.value),1)):p(``,!0),g(`div`,Ue,[g(`button`,{type:`button`,class:`cursor-pointer rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50`,disabled:A.value,onClick:n[10]||=(...e)=>J&&J(...e)},` Batal `,8,We),g(`button`,{type:`submit`,class:`inline-flex cursor-pointer items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50`,disabled:A.value},[A.value?(i(),u(`span`,Ke)):p(``,!0),y(` `+o(A.value?`Menyimpan...`:`Reset Password`),1)],8,Ge)])],32)])])):p(``,!0)]),_:1})],64))}},[[`__scopeId`,`data-v-f13f3aa0`]]);export{U as default};