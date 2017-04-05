// =================
// UPDATE SIMULATION
// =================

function updateSimulation(dt) {
    checkWall.update(dt);
    g_ball.update(dt);
    g_ball2.update(dt);
    g_shots.update(dt);
    g_paddle1.update(dt);
    g_paddle2.update(dt);
    g_portal.update(dt);
    g_portal2.update(dt);
    g_bomb.update(dt);
}


// =================
// RENDER SIMULATION
// =================

function renderSimulation(ctx) {
    if(!tclear) clearCanvas(ctx);
    checkWall.render(ctx)
    g_ball.render(ctx);
    g_ball2.render(ctx);
    g_gamescore.render(ctx);
    g_paddle1.render(ctx);
    g_paddle2.render(ctx);
    g_portal.render(ctx);
    g_portal2.render(ctx);
    g_bomb.render(ctx);
    g_shots.render(ctx);
    
}