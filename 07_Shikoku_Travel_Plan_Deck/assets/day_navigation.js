(()=>{
  const nav=document.querySelector("#day-navigation");
  if(!nav)return;
  const item=(direction,day)=>{
    const href=day?.options?.[0]?.href;
    const label=day?.title||"沒有行程";
    const wrap=document.createElement(href?"a":"span");
    wrap.className="day-nav-item"+(href?"":" is-disabled");
    if(href){wrap.href=href;wrap.setAttribute("aria-label",(direction==="previous"?"前往上一天：":"前往下一天：")+label)}else wrap.setAttribute("aria-disabled","true");
    const directionText=document.createElement("span");directionText.className="day-nav-direction";directionText.textContent=direction==="previous"?"‹ 上一天":"下一天 ›";
    const dayText=document.createElement("strong");dayText.className="day-nav-title";dayText.textContent=href?label:(direction==="previous"?"已是第一天":"已是最後一天");
    wrap.append(directionText,dayText);return wrap;
  };
  document.addEventListener("travel:day-loaded",event=>{
    const date=event.detail&&event.detail.date;if(!date)return;
    fetch("/07_Shikoku_Travel_Plan_Deck/data/travel_catalog.json",{cache:"no-store"}).then(response=>{if(!response.ok)throw new Error("catalog unavailable");return response.json()}).then(catalog=>{
      const trip=(catalog.plans||[]).find(plan=>(plan.days||[]).some(day=>day.date===date));
      if(!trip)return;
      const days=trip.days.slice().sort((a,b)=>a.date.localeCompare(b.date));
      const index=days.findIndex(day=>day.date===date);if(index<0)return;
      const current=days[index];
      const center=document.createElement("div");center.className="day-nav-current";
      const currentDay=document.createElement("span");currentDay.className="day-nav-current-label";currentDay.textContent=current.title||current.date;
      const currentDate=document.createElement("span");currentDate.className="day-nav-current-date";currentDate.textContent=current.date;
      center.append(currentDay,currentDate);
      nav.replaceChildren(item("previous",days[index-1]),center,item("next",days[index+1]));nav.hidden=false;
    }).catch(()=>{nav.hidden=true});
  });
})();
