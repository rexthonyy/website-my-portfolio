function loadAboutJS(){
	loadSkills();
}
function loadSkills(){
	var skills = [];
	skills.push(new Skill("UI/UX Design", 83));
	skills.push(new Skill("Web Design", 92));
	skills.push(new Skill("App development", 87));
	skills.push(new Skill("SEO", 92));

	loadSkillLayout(skills);
}

function loadSkillLayout(skills){
	var skillElements = getSkillElements();
	for(var i = 0; i < skillElements.length; i++){
		var innerHTML = "";
		var skillElm = skillElements[i];
		for(var j = 0; j < skills.length; j++){
			var skill = skills[j];
			
			innerHTML += "<h3>"+skill.name+"</h3><h4>"+skill.percent+"%</h4><div class=\"skill_bar_background\"><div style=\"width:"+skill.percent+"%\" class=\"skill_bar_progress\"></div></div>";
		}
		skillElm.innerHTML = innerHTML;
	}
}

function Skill(name, percent){
	this.name = name;
	this.percent = percent;
}

function getSkillElements(){
	var skillElements = [];
	skillElements.push(document.getElementById("skills"));
	skillElements.push(document.getElementById("skills2"));
	return skillElements;
}