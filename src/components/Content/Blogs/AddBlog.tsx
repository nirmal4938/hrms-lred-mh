import { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import JoditEditor from 'jodit-react';
import axios from 'axios';
import DateTimePicker from 'react-datetime-picker';
import config from '../../../config/config';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

interface Category {
  _id: string;
  name: string;
}

interface Tag {
  _id: string;
  tag: string;
}

interface Faq {
  question: string;
  answer: string;
}

interface Blog {
  title: string;
  content: string;
  category: Category;
  image?: string;
  imagedesc?: string;
  status: string;
  tags: Tag[];
  scheduledAt?: string;
  faqs: Faq[];
}
console.log(config.apiUrl)
const BlogForm = () => {
  const Config: any = useMemo(() => ({
    readonly: false,
    height: 300,
    uploader: {
      url: false,
      insertImageAsBase64URI: true,
      imagesExtensions: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
      filesVariableName: 'images',
      format: 'base64',
    },
    image: {
      allowUrlInsert: true,
      allowUpload: true,
    },
  }), []);

  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const editor = useRef<any>(null); // Use 'any' as a fallback
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [status, setStatus] = useState('draft');
  const [thumbnail, setThumbnail] = useState<string | undefined>(undefined);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | undefined>(undefined);
  const [imagedesc, setImagedesc] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [availableTags, setAvailableTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(false);
  const [faqs, setFaqs] = useState<Faq[]>([{ question: '', answer: '' }]);
  const [scheduledAt, setScheduledAt] = useState<Date | null>(null);
console.log(imagedesc)
  useEffect(() => {
    fetchCategories();
    fetchTags();
    if (id) {
      fetchBlog(id);
    }
  }, [id]);

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get<Category[]>(`${config.apiUrl}/api/blog-category`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
};

const fetchTags = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get<Tag[]>(`${config.apiUrl}/api/blog-tag`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setAvailableTags(response.data);
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
};

const fetchBlog = async (blogId: string) => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get<Blog>(`${config.apiUrl}/api/blog/${blogId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const blog = response.data;
      setTitle(blog.title);
      setContent(blog.content);
      if (blog.image) {
        setThumbnail(blog.image);
        setThumbnailPreview(blog.image);
      }
      setImagedesc(blog.imagedesc || '');
      setCategory(blog.category._id);
      setSelectedTags(blog.tags.map(tag => tag._id));
      setStatus(blog.status);
      setFaqs(blog.faqs && blog.faqs.length ? blog.faqs : [{ question: '', answer: '' }]);
      setScheduledAt(blog.scheduledAt ? new Date(blog.scheduledAt) : null);
    } catch (error) {
      console.error('Error fetching blog:', error);
    }
  };

  const handleTagSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const tagId = e.target.value;
    if (tagId && !selectedTags.includes(tagId)) {
      setSelectedTags([...selectedTags, tagId]);
    }
  };

  const handleTagRemove = (tagId: string) => {
    setSelectedTags(selectedTags.filter(id => id !== tagId));
  };

  const handleSubmit = async (event: React.FormEvent, saveAsDraft = false) => {
    event.preventDefault();
    setLoading(true);
  
    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert("No access token found. Please log in again.");
      setLoading(false);
      return;
    }
  
    const payload = {
      title,
      content,
      category,
      image: thumbnail || undefined,
      imagedesc: imagedesc || undefined,
      status: saveAsDraft ? 'draft' : scheduledAt ? 'scheduled' : 'published',
      isScheduled: !!scheduledAt,
      scheduledAt: scheduledAt ? scheduledAt.toISOString() : null,
      tags: selectedTags,
      faqs: faqs.filter(faq => faq.question.trim() && faq.answer.trim()), // Remove empty FAQs
    };

    console.log(imagedesc)
  
    try {
      const url = id 
        ? `${config.apiUrl}/api/blog/${id}` 
        : `${config.apiUrl}/api/blog`;
  
      const method = id ? 'put' : 'post';
  
      const response = await axios({
        method,
        url,
        data: payload,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        withCredentials: true
      });

      console.log(response)
  
      alert(saveAsDraft ? 'Blog saved as draft!' : id ? 'Blog updated successfully!' : 'Blog published successfully!');
      navigate('/bloglist');
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error submitting blog:", error);
        alert(error.response?.data?.message || "Something went wrong. Please try again.");
      } else {
        console.error("Unexpected error submitting blog:", error);
        alert("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };
  
  
  

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      toBase64(file).then(base64 => {
        setThumbnail(base64);
        setThumbnailPreview(URL.createObjectURL(file));
      });
    }
  };

  const toBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFaqChange = (index: number, field: keyof Faq, value: string) => {
    const updatedFaqs = [...faqs];
    updatedFaqs[index][field] = value;
    setFaqs(updatedFaqs);
  };

  const addFaq = () => {
    setFaqs([...faqs, { question: '', answer: '' }]);
  };

  const removeFaq = (index: number) => {
    const updatedFaqs = [...faqs];
    updatedFaqs.splice(index, 1);
    setFaqs(updatedFaqs);
  };

  const HandleContentchange = useCallback((content: string) => setContent(content), []);

  return (
    <div className="mx-auto w-full shadow-md rounded-lg p-6 bg-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{id ? 'Edit Blog' : 'Create a New Blog'}</h2>
        <div>
          <button
            type="button"
            onClick={() => navigate('/bloglist')}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition mr-2"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => navigate('/bloglist')}
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition"
          >
            Back
          </button>
        </div>
      </div>
      <form className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>{cat.name}</option>
          ))}
        </select>

        <select onChange={handleTagSelect} className="w-full p-2 border rounded">
          <option value="">Select Tag</option>
          {availableTags.filter(tag => !selectedTags.includes(tag._id)).map((tag) => (
            <option key={tag._id} value={tag._id}>{tag.tag}</option>
          ))}
        </select>

        <div className="flex flex-wrap gap-2">
          {selectedTags.map(tagId => {
            const tag = availableTags.find(t => t._id === tagId);
            return tag ? (
              <div key={tagId} className="bg-gray-200 px-2 py-1 rounded flex items-center">
                {tag.tag}
                <button type="button" onClick={() => handleTagRemove(tagId)} className="ml-2 text-red-500">×</button>
              </div>
            ) : null;
          })}
        </div>

        <div className="border p-2 rounded flex flex-col items-start">
          <label className="block text-sm font-medium text-gray-700 mb-2">Thumbnail Image</label>
          <input type="file" accept="image/*" onChange={handleFileChange} className="w-full" />
          {thumbnailPreview && (
            <img src={thumbnailPreview} alt="Thumbnail preview" className="w-24 h-24 object-cover mt-2" />
          )}
        </div>
        <input
          type="text"
          placeholder="Description of image"
          value={imagedesc}
          onChange={(e) => setImagedesc(e.target.value)}
          className="w-full p-2 border rounded"
        />
        {loading && <p className="text-blue-500">Uploading...</p>}

        <JoditEditor
          ref={editor}
          value={content}
          onChange={(editor) => HandleContentchange(editor)}
          config={Config}
        />

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Schedule Post</label>
          <DateTimePicker
            onChange={setScheduledAt}
            value={scheduledAt}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">FAQs</label>
          {faqs.map((faq, index) => (
            <div key={index} className="mb-3 p-3 border rounded">
              <div className="mb-2">
                <input
                  type="text"
                  placeholder="Question"
                  value={faq.question}
                  onChange={(e) => handleFaqChange(index, 'question', e.target.value)}
                  className="w-full p-2 border rounded mb-2"
                />
                <textarea
                  placeholder="Answer"
                  value={faq.answer}
                  onChange={(e) => handleFaqChange(index, 'answer', e.target.value)}
                  className="w-full p-2 border rounded"
                  rows={3}
                />
              </div>
              <button
                type="button"
                onClick={() => removeFaq(index)}
                className="text-red-500 text-sm"
              >
                Remove FAQ
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addFaq}
            className="bg-gray-200 text-gray-700 py-1 px-3 rounded text-sm"
          >
            Add FAQ
          </button>
        </div>

        <div className="flex justify-between">
          <button type="button" onClick={(e) => handleSubmit(e, true)} className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition">Save as Draft</button>
          <button type="button" onClick={(e) => handleSubmit(e, false)} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">{id ? 'Update Blog' : 'Post Blog'}</button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
