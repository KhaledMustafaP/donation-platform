import AdminLayout from "../../components/layout/AdminLayout";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useCampaigns from "../../hooks/useCampaigns";
import { useTranslation } from "react-i18next";

export default function EditCampaign() {
	const { t } = useTranslation();
	const { id } = useParams();
	const navigate = useNavigate();
	const { getCampaign, updateCampaign } = useCampaigns();

	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [category, setCategory] = useState("");
	const [goal, setGoal] = useState<number | "">("");
	const [imageUrl, setImageUrl] = useState("");

	useEffect(() => {
		if (!id) return;
		const num = Number(id);
		const c = getCampaign(num);
		if (!c) return;
		setTitle(c.title || "");
		setDescription(c.description || "");
		setCategory(c.category || "");
		setGoal(c.goal ?? "");
		setImageUrl(c.imageUrl || "");
	}, [id]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!id) return;
		const num = Number(id);
		updateCampaign(num, { title, description, category, goal: Number(goal) || 0, imageUrl });
		navigate("/admin/campaigns");
	};

		return (
			<AdminLayout>
				<div className="p-6">
					<h1 className="text-2xl font-bold mb-4">{t('admin.campaigns.edit')}</h1>
					<form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
						<div>
							<label className="block text-sm font-medium">{t('form.title')}</label>
							<input value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 w-full border rounded px-3 py-2" />
						</div>

						<div>
							<label className="block text-sm font-medium">{t('form.description')}</label>
							<textarea value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 w-full border rounded px-3 py-2" rows={6} />
						</div>

						<div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
							<div>
								<label className="block text-sm font-medium">{t('form.category')}</label>
								<input value={category} onChange={(e) => setCategory(e.target.value)} className="mt-1 w-full border rounded px-3 py-2" />
							</div>
							<div>
								<label className="block text-sm font-medium">{t('form.goal')}</label>
								<input type="number" value={goal} onChange={(e) => setGoal(e.target.value === "" ? "" : Number(e.target.value))} className="mt-1 w-full border rounded px-3 py-2" />
							</div>
							<div>
								<label className="block text-sm font-medium">{t('form.image_url')}</label>
								<input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="mt-1 w-full border rounded px-3 py-2" />
							</div>
						</div>

						<div className="flex items-center gap-2">
							<button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">{t('common.save_changes')}</button>
							<button type="button" onClick={() => navigate(-1)} className="px-4 py-2 border rounded">{t('common.cancel')}</button>
						</div>
					</form>
				</div>
			</AdminLayout>
		);
	}

