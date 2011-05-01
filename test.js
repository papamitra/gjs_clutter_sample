
const Clutter = imports.gi.Clutter;
Clutter.init (0, null);
let stage = Clutter.Stage.get_default ();
stage.title = "Test";
stage.set_color(new Clutter.Color( {red:150, blue:0, green:0, alpha:255} ));
stage.show ();
Clutter.main ();
stage.destroy ();
