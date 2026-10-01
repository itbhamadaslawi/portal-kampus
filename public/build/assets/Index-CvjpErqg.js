import{n as e,t}from"./DashboardLayout-5MkpUaCI.js";import{A as n,C as r,E as i,I as a,M as o,N as s,P as c,S as l,T as u,c as d,g as f,h as p,i as m,j as h,l as g,p as _,t as ee,u as v,v as y,x as te,y as b}from"./app-B4pwc8-Y.js";import{t as x}from"./_plugin-vue_export-helper-BDNMzG2s.js";var S={class:`space-y-4`},C={key:0,class:`rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700`},w={class:`grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3`},T={class:`rounded-2xl border border-gray-200 bg-white p-5 shadow-sm`},E={class:`mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5`},D={class:`grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3`},O={class:`rounded-2xl border border-gray-200 bg-white p-5 shadow-sm`},k={class:`flex items-center justify-between`},A={class:`mt-2 text-3xl font-bold text-gray-800`},j={class:`rounded-2xl border border-gray-200 bg-white p-5 shadow-sm`},M={class:`flex items-center justify-between`},N={class:`mt-2 text-3xl font-bold text-emerald-600`},P={class:`rounded-2xl border border-gray-200 bg-white p-5 shadow-sm`},F={class:`flex items-center justify-between`},I={class:`mt-2 text-3xl font-bold text-red-600`},L={class:`rounded-2xl border border-gray-200 bg-white p-5 shadow-sm`},R={key:0,class:`mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5`},z=[`title`],B={class:`mt-2 text-2xl font-bold text-gray-800`},V={key:1,class:`mt-5 rounded-xl border border-dashed border-gray-300 px-4 py-8 text-center text-sm text-gray-500`},ne=x({__name:`UserSummary`,setup(t){let n=o(!0),s=o(``),c=o({total:0,active:0,inactive:0,groups:[]}),l=async()=>{n.value=!0,s.value=``;try{let t=await e.get(`/admin/users/summary`,{headers:{Accept:`application/json`,"X-Requested-With":`XMLHttpRequest`}});c.value={total:t.data?.total??0,active:t.data?.active??0,inactive:t.data?.inactive??0,groups:Array.isArray(t.data?.groups)?t.data.groups:[]}}catch(e){s.value=e.response?.data?.message||`Resume user gagal dimuat.`}finally{n.value=!1}};return r(()=>{l()}),(e,t)=>(u(),f(`div`,S,[s.value?(u(),f(`div`,C,a(s.value),1)):p(``,!0),n.value?(u(),f(v,{key:1},[_(`div`,w,[(u(),f(v,null,i(3,e=>_(`div`,{key:e,class:`skeleton-shimmer h-28 rounded-2xl`})),64))]),_(`div`,T,[t[0]||=_(`div`,{class:`skeleton-shimmer h-6 w-48 rounded`},null,-1),_(`div`,E,[(u(),f(v,null,i(10,e=>_(`div`,{key:e,class:`skeleton-shimmer h-20 rounded-xl`})),64))])])],64)):(u(),f(v,{key:2},[_(`div`,D,[_(`div`,O,[_(`div`,k,[_(`div`,null,[t[1]||=_(`p`,{class:`text-sm font-medium text-gray-500`},` Total User `,-1),_(`p`,A,a(c.value.total),1)]),t[2]||=_(`div`,{class:`flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600`},[_(`svg`,{xmlns:`http://www.w3.org/2000/svg`,class:`h-6 w-6`,fill:`none`,viewBox:`0 0 24 24`,stroke:`currentColor`,"stroke-width":`1.8`},[_(`path`,{"stroke-linecap":`round`,"stroke-linejoin":`round`,d:`M15 19a4 4 0 00-8 0m12-8a4 4 0 11-8 0 4 4 0 018 0z`})])],-1)])]),_(`div`,j,[_(`div`,M,[_(`div`,null,[t[3]||=_(`p`,{class:`text-sm font-medium text-gray-500`},` User Aktif `,-1),_(`p`,N,a(c.value.active),1)]),t[4]||=_(`div`,{class:`flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600`},[_(`svg`,{xmlns:`http://www.w3.org/2000/svg`,class:`h-6 w-6`,fill:`none`,viewBox:`0 0 24 24`,stroke:`currentColor`,"stroke-width":`1.8`},[_(`path`,{"stroke-linecap":`round`,"stroke-linejoin":`round`,d:`M5 13l4 4L19 7`})])],-1)])]),_(`div`,P,[_(`div`,F,[_(`div`,null,[t[5]||=_(`p`,{class:`text-sm font-medium text-gray-500`},` User Nonaktif `,-1),_(`p`,I,a(c.value.inactive),1)]),t[6]||=_(`div`,{class:`flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600`},[_(`svg`,{xmlns:`http://www.w3.org/2000/svg`,class:`h-6 w-6`,fill:`none`,viewBox:`0 0 24 24`,stroke:`currentColor`,"stroke-width":`1.8`},[_(`path`,{"stroke-linecap":`round`,"stroke-linejoin":`round`,d:`M6 18L18 6M6 6l12 12`})])],-1)])])]),_(`div`,L,[t[8]||=_(`div`,null,[_(`h2`,{class:`text-base font-semibold text-gray-800`},` User Berdasarkan Group `),_(`p`,{class:`mt-1 text-sm text-gray-500`},` Jumlah user berdasarkan group Keycloak. `)],-1),c.value.groups.length?(u(),f(`div`,R,[(u(!0),f(v,null,i(c.value.groups,e=>(u(),f(`div`,{key:e.path,class:`rounded-xl border border-gray-200 bg-gray-50 p-4`},[_(`p`,{class:`truncate text-xs font-medium text-gray-500`,title:e.path},a(e.path),9,z),_(`p`,B,a(e.total),1),t[7]||=_(`p`,{class:`mt-1 text-xs text-gray-500`},` user `,-1)]))),128))])):(u(),f(`div`,V,` Belum ada data group. `))])],64))]))}},[[`__scopeId`,`data-v-a6fa73be`]]),re={class:`w-full min-w-0 space-y-6`},ie={key:0,class:`flex items-start justify-between gap-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700`},ae={key:1,class:`flex items-start justify-between gap-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700`},oe={class:`w-full min-w-0 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm`},se={class:`w-full min-w-0 px-4 py-4 sm:px-6`},ce={class:`users-table-wrapper relative w-full min-w-0`},le={key:0,class:`pointer-events-none absolute inset-x-0 top-[56px] z-30 min-h-[520px] overflow-hidden bg-white`},ue={class:`w-full max-w-md overflow-hidden rounded-xl bg-white shadow-2xl`},de={class:`px-6 pt-6`},fe={key:0,width:`24`,height:`24`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,"stroke-width":`1.8`,"stroke-linecap":`round`,"stroke-linejoin":`round`},pe={key:1,width:`24`,height:`24`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,"stroke-width":`1.8`,"stroke-linecap":`round`,"stroke-linejoin":`round`},me={key:2,width:`24`,height:`24`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,"stroke-width":`1.8`,"stroke-linecap":`round`,"stroke-linejoin":`round`},he={class:`mt-4 text-lg font-semibold text-gray-900`},ge={class:`mt-2 text-sm leading-6 text-gray-500`},_e={class:`flex justify-end gap-2 px-6 py-5`},ve=[`disabled`],ye=[`disabled`],be={key:0,class:`h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white`},xe={class:`w-full max-w-lg rounded-xl bg-white shadow-xl`},Se={class:`flex items-center justify-between border-b border-gray-200 px-5 py-4`},Ce={class:`px-5 py-5`},we={key:0,class:`flex items-center justify-center py-10`},Te={key:1,class:`space-y-4`},Ee={class:`flex items-center gap-4`},De={class:`flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-lg font-semibold text-gray-600`},Oe={class:`min-w-0`},ke={class:`truncate text-base font-semibold text-gray-900`},Ae={class:`mt-1 text-sm text-gray-500`},je={class:`grid grid-cols-1 gap-4 sm:grid-cols-2`},H={class:`mt-1 text-sm text-gray-900`},Me={class:`mt-1 break-all text-sm text-gray-900`},Ne={class:`mt-1 text-sm text-gray-900`},Pe={class:`mt-1 text-sm text-gray-900`},Fe={class:`mt-1`},Ie={key:0,class:`inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700`},Le={key:1,class:`inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-700`},Re={class:`mt-1 text-sm text-gray-900`},ze={class:`flex justify-end border-t border-gray-200 px-5 py-4`},Be={class:`w-full max-w-md rounded-xl bg-white shadow-xl`},Ve={class:`flex items-center justify-between border-b border-gray-200 px-5 py-4`},He={key:0,class:`rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700`},Ue={class:`flex justify-end gap-2 pt-2`},We=[`disabled`],Ge=[`disabled`],Ke={key:0,class:`h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white`},U=x({__name:`Index`,setup(x){let S=o(null),C=null,w=o(!1),T=o(!1),E=o(!1),D=o(null),O=o(``),k=o(``),A=o(!1),j=o(!1),M=o(!1),N=o(!1),P=o(!1),F=o(!0),I=o(``),L=o(``),R=o(null),z=o(``),B=o(``),V=o(``),U=o(``),W=o(null),G=o(!1),K=()=>{I.value=``,L.value=``},qe=async()=>{await te(),S.value&&(C&&=(C.destroy(),null),F.value=!0,C=new window.DataTable(S.value,{processing:!0,serverSide:!0,searching:!0,ordering:!0,paging:!0,info:!0,autoWidth:!1,pageLength:10,lengthMenu:[[10,25,50,100],[10,25,50,100]],ajax:{url:`/admin/users/data`,type:`GET`,dataSrc:function(e){return F.value=!1,Array.isArray(e?.data)?e.data:[]},error:function(e){F.value=!1,console.error(`DataTables error:`,e.responseText)}},initComplete:function(){F.value=!1},drawCallback:function(){F.value=!1},columns:[{data:null,title:`Pengguna`,orderable:!0,searchable:!0,render:(e,t,n)=>{let r=[n.firstName,n.lastName].filter(Boolean).join(` `).trim()||n.name||n.username||`User`,i=n.username||`-`;return`
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
            `,search:``,searchPlaceholder:`Cari pengguna...`,lengthMenu:`_MENU_`,info:`Menampilkan _START_–_END_ dari _TOTAL_ pengguna`,infoEmpty:`Tidak ada pengguna`,infoFiltered:``,zeroRecords:`Pengguna tidak ditemukan`,emptyTable:`Belum ada data pengguna`,paginate:{first:`«`,previous:`‹`,next:`›`,last:`»`}},order:[[0,`asc`]]}),S.value.addEventListener(`click`,q))},q=async e=>{let t=e.target.closest(`button[data-action]`);if(!t)return;let n=t.dataset.action,r=t.dataset.id;if(r){if(n===`detail`){await Je(r);return}if(n===`edit`){Ye(r);return}if(n===`password`){Xe(r);return}if(n===`status`){let e=t.dataset.enabled===`1`;X(`status`,r,e);return}n===`delete`&&X(`delete`,r)}},Je=async t=>{K(),A.value=!0,T.value=!0,R.value=null;try{let n=await e.get(`/admin/users/${t}/json`);R.value=n.data.user??n.data}catch(e){T.value=!1,I.value=e.response?.data?.message||`Data pengguna gagal dimuat.`}finally{A.value=!1}},Ye=e=>{m.visit(`/admin/users/${e}/edit`)},Xe=e=>{K(),D.value={id:e},O.value=``,k.value=``,w.value=!0},J=()=>{j.value||(w.value=!1,D.value=null,O.value=``,k.value=``)},Y=async()=>{if(K(),D.value?.id){if(!O.value){I.value=`Password wajib diisi.`;return}if(O.value.length<8){I.value=`Password minimal 8 karakter.`;return}if(O.value!==k.value){I.value=`Konfirmasi password tidak sesuai.`;return}j.value=!0;try{let t=await e.post(`/admin/users/${D.value.id}/reset-password`,{password:O.value,password_confirmation:k.value});w.value=!1,D.value=null,O.value=``,k.value=``,L.value=t.data?.message||`Password berhasil direset.`}catch(e){I.value=e.response?.data?.message||`Password gagal direset.`}finally{j.value=!1}}},X=(e,t,n=!1)=>{K(),W.value=t,U.value=e,G.value=n,e===`status`&&(n?(z.value=`Nonaktifkan Pengguna`,B.value=`Pengguna ini akan dinonaktifkan dan tidak dapat masuk ke sistem sampai diaktifkan kembali.`,V.value=`Nonaktifkan`):(z.value=`Aktifkan Pengguna`,B.value=`Pengguna ini akan diaktifkan dan dapat masuk kembali ke sistem.`,V.value=`Aktifkan`)),e===`delete`&&(z.value=`Hapus Pengguna`,B.value=`Pengguna akan dihapus secara permanen dari SSO. Tindakan ini tidak dapat dibatalkan.`,V.value=`Hapus`),E.value=!0},Z=()=>{P.value||(E.value=!1,W.value=null,U.value=``,G.value=!1,z.value=``,B.value=``,V.value=``)},Q=async()=>{if(!W.value)return;let t=W.value,n=U.value;P.value=!0,n===`status`&&(N.value=!0),n===`delete`&&(M.value=!0);try{if(n===`status`){let n=await e.patch(`/admin/users/${t}/status`,{enabled:!G.value});L.value=n.data?.message||`Status pengguna berhasil diperbarui.`}if(n===`delete`){let n=await e.delete(`/admin/users/${t}`);L.value=n.data?.message||`Pengguna berhasil dihapus.`}Z(),C&&C.ajax.reload(null,!1)}catch(e){I.value=e.response?.data?.message||(n===`delete`?`Pengguna gagal dihapus.`:`Status pengguna gagal diperbarui.`),E.value=!1}finally{P.value=!1,N.value=!1,M.value=!1}},$=()=>{A.value||(T.value=!1,R.value=null)},Ze=()=>{m.visit(`/admin/users/create`)},Qe=()=>{m.visit(`/admin/users/import`)};return r(()=>{qe()}),l(()=>{S.value&&S.value.removeEventListener(`click`,q),C&&=(C.destroy(),null)}),(e,r)=>(u(),f(v,null,[b(s(ee),{title:`Users`}),b(t,null,{default:n(()=>[_(`div`,re,[L.value?(u(),f(`div`,ie,[_(`div`,null,a(L.value),1),_(`button`,{type:`button`,class:`cursor-pointer text-green-600 hover:text-green-800`,onClick:r[0]||=e=>L.value=``},` × `)])):p(``,!0),I.value?(u(),f(`div`,ae,[_(`div`,null,a(I.value),1),_(`button`,{type:`button`,class:`cursor-pointer text-red-600 hover:text-red-800`,onClick:r[1]||=e=>I.value=``},` × `)])):p(``,!0),_(`div`,{class:`flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between`},[r[15]||=_(`div`,null,[_(`h1`,{class:`text-2xl font-semibold text-gray-900`},` Users `),_(`p`,{class:`mt-1 text-sm text-gray-500`},` Kelola pengguna yang terdaftar pada SSO. `)],-1),_(`div`,{class:`flex flex-col gap-2 sm:flex-row sm:items-center`},[_(`button`,{type:`button`,class:`inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10`,onClick:Qe},[...r[13]||=[_(`svg`,{width:`18`,height:`18`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,"stroke-width":`1.8`,"stroke-linecap":`round`,"stroke-linejoin":`round`},[_(`path`,{d:`M12 3v12`}),_(`path`,{d:`m7 10 5 5 5-5`}),_(`path`,{d:`M5 21h14`})],-1),y(` Import User `,-1)]]),_(`button`,{type:`button`,class:`inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900/20`,onClick:Ze},[...r[14]||=[_(`svg`,{width:`18`,height:`18`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,"stroke-width":`2`,"stroke-linecap":`round`,"stroke-linejoin":`round`},[_(`path`,{d:`M12 5v14`}),_(`path`,{d:`M5 12h14`})],-1),y(` Tambah User `,-1)]])])]),b(ne),_(`div`,oe,[_(`div`,se,[_(`div`,ce,[_(`table`,{ref_key:`table`,ref:S,id:`users-table`,class:`w-full`},[...r[16]||=[_(`thead`,null,[_(`tr`,null,[_(`th`,null,` Pengguna `),_(`th`,null,` Email `),_(`th`,null,` Status `),_(`th`,null,` Aksi `)])],-1),_(`tbody`,null,null,-1)]],512),F.value?(u(),f(`div`,le,[(u(),f(v,null,i(8,e=>_(`div`,{key:e,class:`h-[68px] border-b border-gray-100 px-4`},[...r[17]||=[_(`div`,{class:`flex h-full items-center gap-4`},[_(`div`,{class:`flex min-w-0 flex-1 items-center gap-3`},[_(`div`,{class:`skeleton-shimmer h-10 w-10 shrink-0 rounded-full`}),_(`div`,{class:`min-w-0 flex-1 space-y-2`},[_(`div`,{class:`skeleton-shimmer h-3.5 w-36 rounded`}),_(`div`,{class:`skeleton-shimmer h-3 w-24 rounded`})])]),_(`div`,{class:`hidden flex-[0.65] md:block`},[_(`div`,{class:`skeleton-shimmer h-3.5 w-48 rounded`})]),_(`div`,{class:`hidden w-[110px] sm:block`},[_(`div`,{class:`skeleton-shimmer h-6 w-20 rounded-full`})]),_(`div`,{class:`flex w-[190px] shrink-0 justify-end gap-1`},[_(`div`,{class:`skeleton-shimmer h-8 w-8 rounded-lg`}),_(`div`,{class:`skeleton-shimmer h-8 w-8 rounded-lg`}),_(`div`,{class:`skeleton-shimmer h-8 w-8 rounded-lg`}),_(`div`,{class:`skeleton-shimmer h-8 w-8 rounded-lg`}),_(`div`,{class:`skeleton-shimmer h-8 w-8 rounded-lg`})])],-1)]])),64))])):p(``,!0)])])])]),E.value?(u(),f(`div`,{key:0,class:`fixed inset-0 z-99999 flex items-center justify-center bg-black/40 p-4`,onClick:g(Z,[`self`])},[_(`div`,ue,[_(`div`,de,[_(`div`,{class:c([`flex h-12 w-12 items-center justify-center rounded-full`,U.value===`delete`?`bg-red-50 text-red-600`:G.value?`bg-amber-50 text-amber-600`:`bg-green-50 text-green-600`])},[U.value===`delete`?(u(),f(`svg`,fe,[...r[18]||=[_(`path`,{d:`M3 6h18`},null,-1),_(`path`,{d:`M8 6V4h8v2`},null,-1),_(`path`,{d:`M19 6l-1 14H6L5 6`},null,-1),_(`path`,{d:`M10 11v5`},null,-1),_(`path`,{d:`M14 11v5`},null,-1)]])):G.value?(u(),f(`svg`,pe,[...r[19]||=[_(`circle`,{cx:`12`,cy:`12`,r:`9`},null,-1),_(`path`,{d:`M8 12h8`},null,-1)]])):(u(),f(`svg`,me,[...r[20]||=[_(`circle`,{cx:`12`,cy:`12`,r:`9`},null,-1),_(`path`,{d:`M12 8v8`},null,-1),_(`path`,{d:`M8 12h8`},null,-1)]]))],2),_(`h2`,he,a(z.value),1),_(`p`,ge,a(B.value),1)]),_(`div`,_e,[_(`button`,{type:`button`,class:`cursor-pointer rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50`,disabled:P.value,onClick:r[2]||=(...e)=>Z&&Z(...e)},` Batal `,8,ve),_(`button`,{type:`button`,class:c([`inline-flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-white transition disabled:cursor-not-allowed disabled:opacity-50`,U.value===`delete`?`bg-red-600 hover:bg-red-700`:G.value?`bg-amber-600 hover:bg-amber-700`:`bg-green-600 hover:bg-green-700`]),disabled:P.value,onClick:r[3]||=(...e)=>Q&&Q(...e)},[P.value?(u(),f(`span`,be)):p(``,!0),y(` `+a(P.value?`Memproses...`:V.value),1)],10,ye)])])])):p(``,!0),T.value?(u(),f(`div`,{key:1,class:`fixed inset-0 z-99999 flex items-center justify-center bg-black/40 p-4`,onClick:r[6]||=g((...e)=>$&&$(...e),[`self`])},[_(`div`,xe,[_(`div`,Se,[r[22]||=_(`div`,null,[_(`h2`,{class:`text-lg font-semibold text-gray-900`},` Detail Pengguna `),_(`p`,{class:`mt-1 text-sm text-gray-500`},` Informasi pengguna dari SSO. `)],-1),_(`button`,{type:`button`,class:`cursor-pointer rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700`,onClick:r[4]||=(...e)=>$&&$(...e)},[...r[21]||=[_(`svg`,{width:`20`,height:`20`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,"stroke-width":`2`,"stroke-linecap":`round`,"stroke-linejoin":`round`},[_(`path`,{d:`M18 6 6 18`}),_(`path`,{d:`m6 6 12 12`})],-1)]])]),_(`div`,Ce,[A.value?(u(),f(`div`,we,[...r[23]||=[_(`div`,{class:`h-6 w-6 animate-spin rounded-full border-2 border-gray-200 border-t-gray-800`},null,-1)]])):R.value?(u(),f(`div`,Te,[_(`div`,Ee,[_(`div`,De,a(([R.value.firstName,R.value.lastName].filter(Boolean).join(` `)||R.value.name||R.value.username||`U`).charAt(0).toUpperCase()),1),_(`div`,Oe,[_(`div`,ke,a([R.value.firstName,R.value.lastName].filter(Boolean).join(` `)||R.value.name||R.value.username||`-`),1),_(`div`,Ae,` @`+a(R.value.username||`-`),1)])]),_(`div`,je,[_(`div`,null,[r[24]||=_(`div`,{class:`text-xs font-medium uppercase tracking-wide text-gray-400`},` Username `,-1),_(`div`,H,a(R.value.username||`-`),1)]),_(`div`,null,[r[25]||=_(`div`,{class:`text-xs font-medium uppercase tracking-wide text-gray-400`},` Email `,-1),_(`div`,Me,a(R.value.email||`-`),1)]),_(`div`,null,[r[26]||=_(`div`,{class:`text-xs font-medium uppercase tracking-wide text-gray-400`},` Nama Depan `,-1),_(`div`,Ne,a(R.value.firstName||`-`),1)]),_(`div`,null,[r[27]||=_(`div`,{class:`text-xs font-medium uppercase tracking-wide text-gray-400`},` Nama Belakang `,-1),_(`div`,Pe,a(R.value.lastName||`-`),1)]),_(`div`,null,[r[30]||=_(`div`,{class:`text-xs font-medium uppercase tracking-wide text-gray-400`},` Status `,-1),_(`div`,Fe,[R.value.enabled?(u(),f(`span`,Ie,[...r[28]||=[_(`span`,{class:`h-1.5 w-1.5 rounded-full bg-green-500`},null,-1),y(` Aktif `,-1)]])):(u(),f(`span`,Le,[...r[29]||=[_(`span`,{class:`h-1.5 w-1.5 rounded-full bg-red-500`},null,-1),y(` Nonaktif `,-1)]]))])]),_(`div`,null,[r[31]||=_(`div`,{class:`text-xs font-medium uppercase tracking-wide text-gray-400`},` Email Terverifikasi `,-1),_(`div`,Re,a(R.value.emailVerified?`Ya`:`Tidak`),1)])])])):p(``,!0)]),_(`div`,ze,[_(`button`,{type:`button`,class:`cursor-pointer rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50`,onClick:r[5]||=(...e)=>$&&$(...e)},` Tutup `)])])])):p(``,!0),w.value?(u(),f(`div`,{key:2,class:`fixed inset-0 z-99999 flex items-center justify-center bg-black/40 p-4`,onClick:r[12]||=g((...e)=>J&&J(...e),[`self`])},[_(`div`,Be,[_(`div`,Ve,[r[33]||=_(`div`,null,[_(`h2`,{class:`text-lg font-semibold text-gray-900`},` Reset Password `),_(`p`,{class:`mt-1 text-sm text-gray-500`},` Masukkan password baru pengguna. `)],-1),_(`button`,{type:`button`,class:`cursor-pointer rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700`,onClick:r[7]||=(...e)=>J&&J(...e)},[...r[32]||=[_(`svg`,{width:`20`,height:`20`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,"stroke-width":`2`,"stroke-linecap":`round`,"stroke-linejoin":`round`},[_(`path`,{d:`M18 6 6 18`}),_(`path`,{d:`m6 6 12 12`})],-1)]])]),_(`form`,{class:`space-y-4 px-5 py-5`,onSubmit:r[11]||=g((...e)=>Y&&Y(...e),[`prevent`])},[_(`div`,null,[r[34]||=_(`label`,{class:`mb-1.5 block text-sm font-medium text-gray-700`},` Password Baru `,-1),h(_(`input`,{"onUpdate:modelValue":r[8]||=e=>O.value=e,type:`password`,autocomplete:`new-password`,class:`h-10 w-full rounded-lg border border-gray-300 px-3 text-sm text-gray-900 outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-500/10`,placeholder:`Minimal 8 karakter`},null,512),[[d,O.value]])]),_(`div`,null,[r[35]||=_(`label`,{class:`mb-1.5 block text-sm font-medium text-gray-700`},` Konfirmasi Password `,-1),h(_(`input`,{"onUpdate:modelValue":r[9]||=e=>k.value=e,type:`password`,autocomplete:`new-password`,class:`h-10 w-full rounded-lg border border-gray-300 px-3 text-sm text-gray-900 outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-500/10`,placeholder:`Ulangi password baru`},null,512),[[d,k.value]])]),I.value?(u(),f(`div`,He,a(I.value),1)):p(``,!0),_(`div`,Ue,[_(`button`,{type:`button`,class:`cursor-pointer rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50`,disabled:j.value,onClick:r[10]||=(...e)=>J&&J(...e)},` Batal `,8,We),_(`button`,{type:`submit`,class:`inline-flex cursor-pointer items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50`,disabled:j.value},[j.value?(u(),f(`span`,Ke)):p(``,!0),y(` `+a(j.value?`Menyimpan...`:`Reset Password`),1)],8,Ge)])],32)])])):p(``,!0)]),_:1})],64))}},[[`__scopeId`,`data-v-f13f3aa0`]]);export{U as default};