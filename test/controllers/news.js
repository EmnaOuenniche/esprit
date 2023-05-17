import { News} from "../models/news.js";

export async function createNews(req, res)
{
  News.create({
  title: req.body.title,
  description:req.body.description,
  content:req.body.content,
  author:req.body.author,
  imageUrl:`${req.protocol}://${req.get("host")}/img/${req.file.filename}`,
  iduser:req.body.iduser,
  })
  .then(
  res.status(200).json({
  News 
  }))
}


export async function getAllNews(req, res) {
  try {
    const news = await News.find();
    res.status(200).send(news);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}





export async function getComments(req, res) {
  try {
    const news = await News.findById(req.params.postId);
    if (!news) {
      return res.status(404).json({ message: "News post not found" });
    }
    res.status(200).send(news.comment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function addComment(req, res) {
  try {
    const news = await News.findById(req.params.postId);
    if (!news) {
      return res.status(404).json({ message: "News post not found" });
    }
    const comment = {
      commentAuthor: req.body.commentAuthor,
      commentContent: req.body.commentContent,
      
    };
    console.log(comment);
    news.comment.push(comment);
    await news.save();
    res.status(201).json(comment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}
