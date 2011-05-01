
const Clutter = imports.gi.Clutter;

//let rect = null;

function on_alpha(alpha, data){
    let timeline = alpha.get_timeline();
    const current_frame_num = timeline.get_current_frame();
    const n_frames = timeline.get_n_frames();

    return Clutter.Alpha.MAX_ALPHA * current_frame_num / n_frames;
}

let stage_color = new Clutter.Color({red:0, blue:0, green:0, alpha:255});
let rect_color = new Clutter.Color({red:255, blue:255, green:255, alpha:0x99});

Clutter.init(0,null);

let stage = Clutter.Stage.get_default();
stage.set_size(200,200);
stage.set_color(stage_color);

let rect = new Clutter.Rectangle();
rect.set_color(rect_color);
rect.set_size(40,40);
rect.set_position(10,10);
stage.add_actor(rect);
rect.show();

stage.show();


let timeline = new Clutter.Timeline({'duration':500})
timeline.set_loop(true);
timeline.start();

let knots = [new Clutter.Knot({'x':10, 'y':10}),
	     new Clutter.Knot({'x':150, 'y':150})];

let alpha = new Clutter.Alpha({'timeline':timeline,
			       'mode':Clutter.AnimationMode.EASE_IN_OUT_SINE});

//let behave = new Clutter.BehaviourPath({'alpha':alpha, 'path':knots}); 

let path = new Clutter.Path({'description':"M 50,50 L 100,100"});
let behave = new Clutter.BehaviourPath({"alpha":alpha,
					"path": path}); 
					
behave.apply(rect);

//stage.show_all();

Clutter.main();
