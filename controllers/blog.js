const router = require("express").Router();
const { Blog, Comment } = require("../models");

router.get("/create", (req, res) => {
  try {
    res.render("create");
  } catch (err) {
    console.log({ blogCreateERROR: err });

    res.json(err);
  }
});

router.get("/preview/:id", async (req, res) => {
  try {
    let preview = await Blog.findOne({
      where: {
        id: req.params.id,
      },
      include: [Comment],
    });
    preview = preview.get({ plain: true });
    const owner = () => preview.username == req.session.username;
    console.log(`The post id is: ${req.params.id}
    username: ${req.session.username}
    owner: ${preview.username}
      `);

    res.render("preview", {
      title: preview.title,
      content: preview.content,
      comments: preview.comments.reverse(),
      id: req.params.id,
      owner: owner,
      loggedIn: req.session.logged,
      username: req.session.username,
    });
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;

// const router = require("express").Router();
// const { Blog } = require("../../models");

// router.post("/create", async (req, res) => {
//   try {
//     const newBlog = await Blog.create({
//       username: req.session.username,
//       title: req.body.title,
//       content: req.body.content,
//     });
//     res.redirect("/");
//   } catch (err) {
//     res.json(err);
//   }
// });

// router.put("/edit", async (req, res) => {
//   try {
//     let update = await Blog.update(
//       {
//         title: req.body.title,
//         content: req.body.content,
//       },
//       {
//         where: {
//           id: req.body.id,
//         },
//       }
//     );
//     console.log("UDPATE BROOO ROUTE:::" + update);
//     res.status(200).json({ message: "Update successful" });
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// module.exports = router;