import { useForm } from 'react-hook-form';
import { X } from 'lucide-react';
import { useCreatePost } from '../hooks/usePosts';
import { useAuth } from '../context/AuthContext';
import { PRESET_CATEGORIES } from '../utils/categories';

interface FormValues {
  title: string;
  description: string;
  category: string;
  customCategory: string;
}

interface Props {
  onClose: () => void;
}

export default function CreatePostModal({ onClose }: Props) {
  const { user } = useAuth();
  const { mutateAsync, isPending } = useCreatePost();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({ defaultValues: { category: PRESET_CATEGORIES[0] } });

  const selectedCategory = watch('category');

  const onSubmit = async (values: FormValues) => {
    if (!user) return;
    const category = values.category === '__custom__' ? values.customCategory : values.category;
    await mutateAsync({
      title: values.title.trim(),
      description: values.description.trim(),
      category: category.trim(),
      user_id: user.uid,
      user_email: user.email ?? undefined,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-950/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-parchment border border-ink-200 rounded-sm shadow-2xl w-full max-w-lg animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-ink-100">
          <h2 className="font-display text-2xl font-semibold text-ink-950">New Post</h2>
          <button onClick={onClose} className="text-ink-400 hover:text-ink-700 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-5 flex flex-col gap-5">
          {/* Title */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-ink-500 mb-1.5">
              Title *
            </label>
            <input
              {...register('title', {
                required: 'Title is required',
                minLength: { value: 3, message: 'At least 3 characters' },
                maxLength: { value: 255, message: 'Max 255 characters' },
              })}
              className="input-field"
              placeholder="Enter post title…"
            />
            {errors.title && (
              <p className="mt-1 text-xs text-rust">{errors.title.message}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-ink-500 mb-1.5">
              Category *
            </label>
            <select
              {...register('category', { required: true })}
              className="input-field"
            >
              {PRESET_CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
              <option value="__custom__">+ Custom category…</option>
            </select>
            {selectedCategory === '__custom__' && (
              <input
                {...register('customCategory', {
                  validate: (v) =>
                    selectedCategory !== '__custom__' || (v && v.trim().length > 0) || 'Enter a category name',
                })}
                className="input-field mt-2"
                placeholder="Custom category name…"
              />
            )}
            {errors.customCategory && (
              <p className="mt-1 text-xs text-rust">{errors.customCategory.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-ink-500 mb-1.5">
              Description *
            </label>
            <textarea
              {...register('description', {
                required: 'Description is required',
                minLength: { value: 10, message: 'At least 10 characters' },
              })}
              rows={5}
              className="input-field resize-none"
              placeholder="Write your post content…"
            />
            {errors.description && (
              <p className="mt-1 text-xs text-rust">{errors.description.message}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end pt-1">
            <button type="button" onClick={onClose} className="btn-ghost">
              Cancel
            </button>
            <button type="submit" disabled={isPending} className="btn-primary">
              {isPending ? 'Publishing…' : 'Publish Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
