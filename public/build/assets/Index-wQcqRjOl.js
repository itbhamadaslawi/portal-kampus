import{n as e,t}from"./DashboardLayout-kytxqmtO.js";import{C as n,D as r,F as i,I as a,M as o,N as s,O as c,P as l,R as u,T as d,_ as f,b as p,d as m,f as h,h as g,i as _,l as v,t as ee,v as y,w as te,x as b}from"./app-CCNiMmYM.js";import{t as x}from"./_plugin-vue_export-helper-BDNMzG2s.js";var S={class:`space-y-4`},C={key:0,class:`rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700`},w={class:`grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3`},T={class:`rounded-2xl border border-gray-200 bg-white p-5 shadow-sm`},E={class:`mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5`},D={class:`grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3`},O={class:`rounded-2xl border border-gray-200 bg-white p-5 shadow-sm`},k={class:`flex items-center justify-between`},A={class:`mt-2 text-3xl font-bold text-gray-800`},j={class:`rounded-2xl border border-gray-200 bg-white p-5 shadow-sm`},M={class:`flex items-center justify-between`},N={class:`mt-2 text-3xl font-bold text-emerald-600`},P={class:`rounded-2xl border border-gray-200 bg-white p-5 shadow-sm`},F={class:`flex items-center justify-between`},I={class:`mt-2 text-3xl font-bold text-red-600`},L={class:`rounded-2xl border border-gray-200 bg-white p-5 shadow-sm`},R={key:0,class:`mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5`},z=[`title`],B={class:`mt-2 text-2xl font-bold text-gray-800`},V={key:1,class:`mt-5 rounded-xl border border-dashed border-gray-300 px-4 py-8 text-center text-sm text-gray-500`},ne=x({__name:`UserSummary`,setup(t){let n=l(!0),i=l(``),a=l({total:0,active:0,inactive:0,groups:[]}),o=async()=>{n.value=!0,i.value=``;try{let t=await e.get(`/admin/users/summary`,{headers:{Accept:`application/json`,"X-Requested-With":`XMLHttpRequest`}});a.value={total:t.data?.total??0,active:t.data?.active??0,inactive:t.data?.inactive??0,groups:Array.isArray(t.data?.groups)?t.data.groups:[]}}catch(e){i.value=e.response?.data?.message||`Resume user gagal dimuat.`}finally{n.value=!1}};return d(()=>{o()}),(e,t)=>(r(),y(`div`,S,[i.value?(r(),y(`div`,C,u(i.value),1)):f(``,!0),n.value?(r(),y(h,{key:1},[g(`div`,w,[(r(),y(h,null,c(3,e=>g(`div`,{key:e,class:`skeleton-shimmer h-28 rounded-2xl`})),64))]),g(`div`,T,[t[0]||=g(`div`,{class:`skeleton-shimmer h-6 w-48 rounded`},null,-1),g(`div`,E,[(r(),y(h,null,c(10,e=>g(`div`,{key:e,class:`skeleton-shimmer h-20 rounded-xl`})),64))])])],64)):(r(),y(h,{key:2},[g(`div`,D,[g(`div`,O,[g(`div`,k,[g(`div`,null,[t[1]||=g(`p`,{class:`text-sm font-medium text-gray-500`},` Total User `,-1),g(`p`,A,u(a.value.total),1)]),t[2]||=g(`div`,{class:`flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600`},[g(`svg`,{xmlns:`http://www.w3.org/2000/svg`,class:`h-6 w-6`,fill:`none`,viewBox:`0 0 24 24`,stroke:`currentColor`,"stroke-width":`1.8`},[g(`path`,{"stroke-linecap":`round`,"stroke-linejoin":`round`,d:`M15 19a4 4 0 00-8 0m12-8a4 4 0 11-8 0 4 4 0 018 0z`})])],-1)])]),g(`div`,j,[g(`div`,M,[g(`div`,null,[t[3]||=g(`p`,{class:`text-sm font-medium text-gray-500`},` User Aktif `,-1),g(`p`,N,u(a.value.active),1)]),t[4]||=g(`div`,{class:`flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600`},[g(`svg`,{xmlns:`http://www.w3.org/2000/svg`,class:`h-6 w-6`,fill:`none`,viewBox:`0 0 24 24`,stroke:`currentColor`,"stroke-width":`1.8`},[g(`path`,{"stroke-linecap":`round`,"stroke-linejoin":`round`,d:`M5 13l4 4L19 7`})])],-1)])]),g(`div`,P,[g(`div`,F,[g(`div`,null,[t[5]||=g(`p`,{class:`text-sm font-medium text-gray-500`},` User Nonaktif `,-1),g(`p`,I,u(a.value.inactive),1)]),t[6]||=g(`div`,{class:`flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600`},[g(`svg`,{xmlns:`http://www.w3.org/2000/svg`,class:`h-6 w-6`,fill:`none`,viewBox:`0 0 24 24`,stroke:`currentColor`,"stroke-width":`1.8`},[g(`path`,{"stroke-linecap":`round`,"stroke-linejoin":`round`,d:`M6 18L18 6M6 6l12 12`})])],-1)])])]),g(`div`,L,[t[8]||=g(`div`,null,[g(`h2`,{class:`text-base font-semibold text-gray-800`},` User Berdasarkan Group `),g(`p`,{class:`mt-1 text-sm text-gray-500`},` Jumlah user berdasarkan group Keycloak. `)],-1),a.value.groups.length?(r(),y(`div`,R,[(r(!0),y(h,null,c(a.value.groups,e=>(r(),y(`div`,{key:e.path,class:`rounded-xl border border-gray-200 bg-gray-50 p-4`},[g(`p`,{class:`truncate text-xs font-medium text-gray-500`,title:e.path},u(e.path),9,z),g(`p`,B,u(e.total),1),t[7]||=g(`p`,{class:`mt-1 text-xs text-gray-500`},` user `,-1)]))),128))])):(r(),y(`div`,V,` Belum ada data group. `))])],64))]))}},[[`__scopeId`,`data-v-a6fa73be`]]),re={class:`w-full min-w-0 space-y-6`},ie={key:0,class:`flex items-start justify-between gap-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700`},ae={key:1,class:`flex items-start justify-between gap-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700`},oe={class:`w-full min-w-0 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm`},se={class:`w-full min-w-0 px-4 py-4 sm:px-6`},ce={class:`users-table-wrapper relative w-full min-w-0`},le={key:0,class:`pointer-events-none absolute inset-x-0 top-[56px] z-30 min-h-[520px] overflow-hidden bg-white`},ue={class:`w-full max-w-md overflow-hidden rounded-xl bg-white shadow-2xl`},de={class:`px-6 pt-6`},fe={key:0,width:`24`,height:`24`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,"stroke-width":`1.8`,"stroke-linecap":`round`,"stroke-linejoin":`round`},pe={key:1,width:`24`,height:`24`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,"stroke-width":`1.8`,"stroke-linecap":`round`,"stroke-linejoin":`round`},me={key:2,width:`24`,height:`24`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,"stroke-width":`1.8`,"stroke-linecap":`round`,"stroke-linejoin":`round`},he={class:`mt-4 text-lg font-semibold text-gray-900`},ge={class:`mt-2 text-sm leading-6 text-gray-500`},_e={class:`flex justify-end gap-2 px-6 py-5`},ve=[`disabled`],ye=[`disabled`],be={key:0,class:`h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white`},xe={class:`w-full max-w-lg rounded-xl bg-white shadow-xl`},Se={class:`flex items-center justify-between border-b border-gray-200 px-5 py-4`},Ce={class:`px-5 py-5`},we={key:0,class:`flex items-center justify-center py-10`},Te={key:1,class:`space-y-4`},Ee={class:`flex items-center gap-4`},De={class:`flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-lg font-semibold text-gray-600`},Oe={class:`min-w-0`},ke={class:`truncate text-base font-semibold text-gray-900`},Ae={class:`mt-1 text-sm text-gray-500`},H={class:`grid grid-cols-1 gap-4 sm:grid-cols-2`},je={class:`mt-1 text-sm text-gray-900`},Me={class:`mt-1 break-all text-sm text-gray-900`},Ne={class:`mt-1 text-sm text-gray-900`},Pe={class:`mt-1 text-sm text-gray-900`},Fe={class:`mt-1`},Ie={key:0,class:`inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700`},Le={key:1,class:`inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-700`},Re={class:`mt-1 text-sm text-gray-900`},ze={class:`flex justify-end border-t border-gray-200 px-5 py-4`},Be={class:`w-full max-w-md rounded-xl bg-white shadow-xl`},Ve={class:`flex items-center justify-between border-b border-gray-200 px-5 py-4`},He={key:0,class:`rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700`},Ue={class:`flex justify-end gap-2 pt-2`},We=[`disabled`],Ge=[`disabled`],Ke={key:0,class:`h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white`},U=x({__name:`Index`,setup(x){let S=l(null),C=null,w=l(!1),T=l(!1),E=l(!1),D=l(null),O=l(``),k=l(``),A=l(!1),j=l(!1),M=l(!1),N=l(!1),P=l(!1),F=l(!0),I=l(``),L=l(``),R=l(null),z=l(``),B=l(``),V=l(``),U=l(``),W=l(null),G=l(!1),K=()=>{I.value=``,L.value=``},qe=async()=>{await n(),S.value&&(C&&=(C.destroy(),null),F.value=!0,C=new window.DataTable(S.value,{processing:!0,serverSide:!0,searching:!0,ordering:!0,paging:!0,info:!0,autoWidth:!1,pageLength:10,lengthMenu:[[10,25,50,100],[10,25,50,100]],ajax:{url:`/admin/users/data`,type:`GET`,dataSrc:function(e){return F.value=!1,Array.isArray(e?.data)?e.data:[]},error:function(e){F.value=!1,console.error(`DataTables error:`,e.responseText)}},initComplete:function(){F.value=!1},drawCallback:function(){F.value=!1},columns:[{data:null,title:`Pengguna`,orderable:!0,searchable:!0,render:(e,t,n)=>{let r=[n.firstName,n.lastName].filter(Boolean).join(` `).trim()||n.name||n.username||`User`,i=n.username||`-`;return`
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
            `,search:``,searchPlaceholder:`Cari pengguna...`,lengthMenu:`_MENU_`,info:`Menampilkan _START_–_END_ dari _TOTAL_ pengguna`,infoEmpty:`Tidak ada pengguna`,infoFiltered:``,zeroRecords:`Pengguna tidak ditemukan`,emptyTable:`Belum ada data pengguna`,paginate:{first:`«`,previous:`‹`,next:`›`,last:`»`}},order:[[0,`asc`]]}),S.value.addEventListener(`click`,q))},q=async e=>{let t=e.target.closest(`button[data-action]`);if(!t)return;let n=t.dataset.action,r=t.dataset.id;if(r){if(n===`detail`){await Je(r);return}if(n===`edit`){Ye(r);return}if(n===`password`){Xe(r);return}if(n===`status`){let e=t.dataset.enabled===`1`;X(`status`,r,e);return}n===`delete`&&X(`delete`,r)}},Je=async t=>{K(),A.value=!0,T.value=!0,R.value=null;try{let n=await e.get(`/admin/users/${t}/json`);R.value=n.data.user??n.data}catch(e){T.value=!1,I.value=e.response?.data?.message||`Data pengguna gagal dimuat.`}finally{A.value=!1}},Ye=e=>{_.visit(`/admin/users/${e}/edit`)},Xe=e=>{K(),D.value={id:e},O.value=``,k.value=``,w.value=!0},J=()=>{j.value||(w.value=!1,D.value=null,O.value=``,k.value=``)},Y=async()=>{if(K(),D.value?.id){if(!O.value){I.value=`Password wajib diisi.`;return}if(O.value.length<8){I.value=`Password minimal 8 karakter.`;return}if(O.value!==k.value){I.value=`Konfirmasi password tidak sesuai.`;return}j.value=!0;try{let t=await e.post(`/admin/users/${D.value.id}/reset-password`,{password:O.value,password_confirmation:k.value});w.value=!1,D.value=null,O.value=``,k.value=``,L.value=t.data?.message||`Password berhasil direset.`}catch(e){I.value=e.response?.data?.message||`Password gagal direset.`}finally{j.value=!1}}},X=(e,t,n=!1)=>{K(),W.value=t,U.value=e,G.value=n,e===`status`&&(n?(z.value=`Nonaktifkan Pengguna`,B.value=`Pengguna ini akan dinonaktifkan dan tidak dapat masuk ke sistem sampai diaktifkan kembali.`,V.value=`Nonaktifkan`):(z.value=`Aktifkan Pengguna`,B.value=`Pengguna ini akan diaktifkan dan dapat masuk kembali ke sistem.`,V.value=`Aktifkan`)),e===`delete`&&(z.value=`Hapus Pengguna`,B.value=`Pengguna akan dihapus secara permanen dari SSO. Tindakan ini tidak dapat dibatalkan.`,V.value=`Hapus`),E.value=!0},Z=()=>{P.value||(E.value=!1,W.value=null,U.value=``,G.value=!1,z.value=``,B.value=``,V.value=``)},Q=async()=>{if(!W.value)return;let t=W.value,n=U.value;P.value=!0,n===`status`&&(N.value=!0),n===`delete`&&(M.value=!0);try{if(n===`status`){let n=await e.patch(`/admin/users/${t}/status`,{enabled:!G.value});L.value=n.data?.message||`Status pengguna berhasil diperbarui.`}if(n===`delete`){let n=await e.delete(`/admin/users/${t}`);L.value=n.data?.message||`Pengguna berhasil dihapus.`}Z(),C&&C.ajax.reload(null,!1)}catch(e){I.value=e.response?.data?.message||(n===`delete`?`Pengguna gagal dihapus.`:`Status pengguna gagal diperbarui.`),E.value=!1}finally{P.value=!1,N.value=!1,M.value=!1}},$=()=>{A.value||(T.value=!1,R.value=null)},Ze=()=>{_.visit(`/admin/users/create`)},Qe=()=>{_.visit(`/admin/users/import`)};return d(()=>{qe()}),te(()=>{S.value&&S.value.removeEventListener(`click`,q),C&&=(C.destroy(),null)}),(e,n)=>(r(),y(h,null,[b(i(ee),{title:`Users`}),b(t,null,{default:o(()=>[g(`div`,re,[L.value?(r(),y(`div`,ie,[g(`div`,null,u(L.value),1),g(`button`,{type:`button`,class:`cursor-pointer text-green-600 hover:text-green-800`,onClick:n[0]||=e=>L.value=``},` × `)])):f(``,!0),I.value?(r(),y(`div`,ae,[g(`div`,null,u(I.value),1),g(`button`,{type:`button`,class:`cursor-pointer text-red-600 hover:text-red-800`,onClick:n[1]||=e=>I.value=``},` × `)])):f(``,!0),g(`div`,{class:`flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between`},[n[15]||=g(`div`,null,[g(`h1`,{class:`text-2xl font-semibold text-gray-900`},` Users `),g(`p`,{class:`mt-1 text-sm text-gray-500`},` Kelola pengguna yang terdaftar pada SSO. `)],-1),g(`div`,{class:`flex flex-col gap-2 sm:flex-row sm:items-center`},[g(`button`,{type:`button`,class:`inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10`,onClick:Qe},[...n[13]||=[g(`svg`,{width:`18`,height:`18`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,"stroke-width":`1.8`,"stroke-linecap":`round`,"stroke-linejoin":`round`},[g(`path`,{d:`M12 3v12`}),g(`path`,{d:`m7 10 5 5 5-5`}),g(`path`,{d:`M5 21h14`})],-1),p(` Import User `,-1)]]),g(`button`,{type:`button`,class:`inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900/20`,onClick:Ze},[...n[14]||=[g(`svg`,{width:`18`,height:`18`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,"stroke-width":`2`,"stroke-linecap":`round`,"stroke-linejoin":`round`},[g(`path`,{d:`M12 5v14`}),g(`path`,{d:`M5 12h14`})],-1),p(` Tambah User `,-1)]])])]),b(ne),g(`div`,oe,[g(`div`,se,[g(`div`,ce,[g(`table`,{ref_key:`table`,ref:S,id:`users-table`,class:`w-full`},[...n[16]||=[g(`thead`,null,[g(`tr`,null,[g(`th`,null,` Pengguna `),g(`th`,null,` Email `),g(`th`,null,` Status `),g(`th`,null,` Aksi `)])],-1),g(`tbody`,null,null,-1)]],512),F.value?(r(),y(`div`,le,[(r(),y(h,null,c(8,e=>g(`div`,{key:e,class:`h-[68px] border-b border-gray-100 px-4`},[...n[17]||=[g(`div`,{class:`flex h-full items-center gap-4`},[g(`div`,{class:`flex min-w-0 flex-1 items-center gap-3`},[g(`div`,{class:`skeleton-shimmer h-10 w-10 shrink-0 rounded-full`}),g(`div`,{class:`min-w-0 flex-1 space-y-2`},[g(`div`,{class:`skeleton-shimmer h-3.5 w-36 rounded`}),g(`div`,{class:`skeleton-shimmer h-3 w-24 rounded`})])]),g(`div`,{class:`hidden flex-[0.65] md:block`},[g(`div`,{class:`skeleton-shimmer h-3.5 w-48 rounded`})]),g(`div`,{class:`hidden w-[110px] sm:block`},[g(`div`,{class:`skeleton-shimmer h-6 w-20 rounded-full`})]),g(`div`,{class:`flex w-[190px] shrink-0 justify-end gap-1`},[g(`div`,{class:`skeleton-shimmer h-8 w-8 rounded-lg`}),g(`div`,{class:`skeleton-shimmer h-8 w-8 rounded-lg`}),g(`div`,{class:`skeleton-shimmer h-8 w-8 rounded-lg`}),g(`div`,{class:`skeleton-shimmer h-8 w-8 rounded-lg`}),g(`div`,{class:`skeleton-shimmer h-8 w-8 rounded-lg`})])],-1)]])),64))])):f(``,!0)])])])]),E.value?(r(),y(`div`,{key:0,class:`fixed inset-0 z-99999 flex items-center justify-center bg-black/40 p-4`,onClick:m(Z,[`self`])},[g(`div`,ue,[g(`div`,de,[g(`div`,{class:a([`flex h-12 w-12 items-center justify-center rounded-full`,U.value===`delete`?`bg-red-50 text-red-600`:G.value?`bg-amber-50 text-amber-600`:`bg-green-50 text-green-600`])},[U.value===`delete`?(r(),y(`svg`,fe,[...n[18]||=[g(`path`,{d:`M3 6h18`},null,-1),g(`path`,{d:`M8 6V4h8v2`},null,-1),g(`path`,{d:`M19 6l-1 14H6L5 6`},null,-1),g(`path`,{d:`M10 11v5`},null,-1),g(`path`,{d:`M14 11v5`},null,-1)]])):G.value?(r(),y(`svg`,pe,[...n[19]||=[g(`circle`,{cx:`12`,cy:`12`,r:`9`},null,-1),g(`path`,{d:`M8 12h8`},null,-1)]])):(r(),y(`svg`,me,[...n[20]||=[g(`circle`,{cx:`12`,cy:`12`,r:`9`},null,-1),g(`path`,{d:`M12 8v8`},null,-1),g(`path`,{d:`M8 12h8`},null,-1)]]))],2),g(`h2`,he,u(z.value),1),g(`p`,ge,u(B.value),1)]),g(`div`,_e,[g(`button`,{type:`button`,class:`cursor-pointer rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50`,disabled:P.value,onClick:n[2]||=(...e)=>Z&&Z(...e)},` Batal `,8,ve),g(`button`,{type:`button`,class:a([`inline-flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-white transition disabled:cursor-not-allowed disabled:opacity-50`,U.value===`delete`?`bg-red-600 hover:bg-red-700`:G.value?`bg-amber-600 hover:bg-amber-700`:`bg-green-600 hover:bg-green-700`]),disabled:P.value,onClick:n[3]||=(...e)=>Q&&Q(...e)},[P.value?(r(),y(`span`,be)):f(``,!0),p(` `+u(P.value?`Memproses...`:V.value),1)],10,ye)])])])):f(``,!0),T.value?(r(),y(`div`,{key:1,class:`fixed inset-0 z-99999 flex items-center justify-center bg-black/40 p-4`,onClick:n[6]||=m((...e)=>$&&$(...e),[`self`])},[g(`div`,xe,[g(`div`,Se,[n[22]||=g(`div`,null,[g(`h2`,{class:`text-lg font-semibold text-gray-900`},` Detail Pengguna `),g(`p`,{class:`mt-1 text-sm text-gray-500`},` Informasi pengguna dari SSO. `)],-1),g(`button`,{type:`button`,class:`cursor-pointer rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700`,onClick:n[4]||=(...e)=>$&&$(...e)},[...n[21]||=[g(`svg`,{width:`20`,height:`20`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,"stroke-width":`2`,"stroke-linecap":`round`,"stroke-linejoin":`round`},[g(`path`,{d:`M18 6 6 18`}),g(`path`,{d:`m6 6 12 12`})],-1)]])]),g(`div`,Ce,[A.value?(r(),y(`div`,we,[...n[23]||=[g(`div`,{class:`h-6 w-6 animate-spin rounded-full border-2 border-gray-200 border-t-gray-800`},null,-1)]])):R.value?(r(),y(`div`,Te,[g(`div`,Ee,[g(`div`,De,u(([R.value.firstName,R.value.lastName].filter(Boolean).join(` `)||R.value.name||R.value.username||`U`).charAt(0).toUpperCase()),1),g(`div`,Oe,[g(`div`,ke,u([R.value.firstName,R.value.lastName].filter(Boolean).join(` `)||R.value.name||R.value.username||`-`),1),g(`div`,Ae,` @`+u(R.value.username||`-`),1)])]),g(`div`,H,[g(`div`,null,[n[24]||=g(`div`,{class:`text-xs font-medium uppercase tracking-wide text-gray-400`},` Username `,-1),g(`div`,je,u(R.value.username||`-`),1)]),g(`div`,null,[n[25]||=g(`div`,{class:`text-xs font-medium uppercase tracking-wide text-gray-400`},` Email `,-1),g(`div`,Me,u(R.value.email||`-`),1)]),g(`div`,null,[n[26]||=g(`div`,{class:`text-xs font-medium uppercase tracking-wide text-gray-400`},` Nama Depan `,-1),g(`div`,Ne,u(R.value.firstName||`-`),1)]),g(`div`,null,[n[27]||=g(`div`,{class:`text-xs font-medium uppercase tracking-wide text-gray-400`},` Nama Belakang `,-1),g(`div`,Pe,u(R.value.lastName||`-`),1)]),g(`div`,null,[n[30]||=g(`div`,{class:`text-xs font-medium uppercase tracking-wide text-gray-400`},` Status `,-1),g(`div`,Fe,[R.value.enabled?(r(),y(`span`,Ie,[...n[28]||=[g(`span`,{class:`h-1.5 w-1.5 rounded-full bg-green-500`},null,-1),p(` Aktif `,-1)]])):(r(),y(`span`,Le,[...n[29]||=[g(`span`,{class:`h-1.5 w-1.5 rounded-full bg-red-500`},null,-1),p(` Nonaktif `,-1)]]))])]),g(`div`,null,[n[31]||=g(`div`,{class:`text-xs font-medium uppercase tracking-wide text-gray-400`},` Email Terverifikasi `,-1),g(`div`,Re,u(R.value.emailVerified?`Ya`:`Tidak`),1)])])])):f(``,!0)]),g(`div`,ze,[g(`button`,{type:`button`,class:`cursor-pointer rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50`,onClick:n[5]||=(...e)=>$&&$(...e)},` Tutup `)])])])):f(``,!0),w.value?(r(),y(`div`,{key:2,class:`fixed inset-0 z-99999 flex items-center justify-center bg-black/40 p-4`,onClick:n[12]||=m((...e)=>J&&J(...e),[`self`])},[g(`div`,Be,[g(`div`,Ve,[n[33]||=g(`div`,null,[g(`h2`,{class:`text-lg font-semibold text-gray-900`},` Reset Password `),g(`p`,{class:`mt-1 text-sm text-gray-500`},` Masukkan password baru pengguna. `)],-1),g(`button`,{type:`button`,class:`cursor-pointer rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700`,onClick:n[7]||=(...e)=>J&&J(...e)},[...n[32]||=[g(`svg`,{width:`20`,height:`20`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,"stroke-width":`2`,"stroke-linecap":`round`,"stroke-linejoin":`round`},[g(`path`,{d:`M18 6 6 18`}),g(`path`,{d:`m6 6 12 12`})],-1)]])]),g(`form`,{class:`space-y-4 px-5 py-5`,onSubmit:n[11]||=m((...e)=>Y&&Y(...e),[`prevent`])},[g(`div`,null,[n[34]||=g(`label`,{class:`mb-1.5 block text-sm font-medium text-gray-700`},` Password Baru `,-1),s(g(`input`,{"onUpdate:modelValue":n[8]||=e=>O.value=e,type:`password`,autocomplete:`new-password`,class:`h-10 w-full rounded-lg border border-gray-300 px-3 text-sm text-gray-900 outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-500/10`,placeholder:`Minimal 8 karakter`},null,512),[[v,O.value]])]),g(`div`,null,[n[35]||=g(`label`,{class:`mb-1.5 block text-sm font-medium text-gray-700`},` Konfirmasi Password `,-1),s(g(`input`,{"onUpdate:modelValue":n[9]||=e=>k.value=e,type:`password`,autocomplete:`new-password`,class:`h-10 w-full rounded-lg border border-gray-300 px-3 text-sm text-gray-900 outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-500/10`,placeholder:`Ulangi password baru`},null,512),[[v,k.value]])]),I.value?(r(),y(`div`,He,u(I.value),1)):f(``,!0),g(`div`,Ue,[g(`button`,{type:`button`,class:`cursor-pointer rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50`,disabled:j.value,onClick:n[10]||=(...e)=>J&&J(...e)},` Batal `,8,We),g(`button`,{type:`submit`,class:`inline-flex cursor-pointer items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50`,disabled:j.value},[j.value?(r(),y(`span`,Ke)):f(``,!0),p(` `+u(j.value?`Menyimpan...`:`Reset Password`),1)],8,Ge)])],32)])])):f(``,!0)]),_:1})],64))}},[[`__scopeId`,`data-v-f13f3aa0`]]);export{U as default};