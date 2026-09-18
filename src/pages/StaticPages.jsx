import Icon from '@/components/common/Icon.jsx'
import { usePageTitle } from '@/hooks/usePageTitle.js'
import { Link } from 'react-router-dom'
import './StaticPages.scss'

// Shared layout for simple informational pages
function PageLayout({ title, children }) {
	usePageTitle(title)
	return (
		<div className="static-page container">
			<nav
				className="static-page__crumbs"
				aria-label="Breadcrumb"
			>
				<Link to="/">Home</Link>
				<Icon
					name="chevronRight"
					size={14}
				/>
				<span>{title}</span>
			</nav>
			<h1 className="static-page__title">{title}</h1>
			<div className="static-page__content">{children}</div>
		</div>
	)
}

export function ShippingReturns() {
	return (
		<PageLayout title="Shipping & Returns">
			<section className="static-page__section">
				<h2>Shipping</h2>
				<p>
					We offer free standard shipping on all orders over $150. Orders are
					typically processed within 1-2 business days and delivered within 3-7
					business days depending on your location.
				</p>
				<ul>
					<li>
						<strong>Standard Shipping:</strong> 3-7 business days — Free on
						orders over $150, otherwise $12
					</li>
					<li>
						<strong>Express Shipping:</strong> 1-3 business days — $18
					</li>
					<li>
						<strong>Next Day Delivery:</strong> Order by 2pm for next business
						day — $25
					</li>
				</ul>
			</section>

			<section className="static-page__section">
				<h2>Returns</h2>
				<p>
					We want you to love your purchase. If you're not completely satisfied,
					you can return unworn items within 30 days of delivery for a full
					refund.
				</p>
				<ul>
					<li>
						Items must be unworn, unwashed, and have all original tags attached
					</li>
					<li>Return shipping is free for all US orders</li>
					<li>
						Refunds are processed within 5-7 business days of receiving your
						return
					</li>
					<li>Sale items are final sale and cannot be returned</li>
				</ul>
			</section>

			<section className="static-page__section">
				<h2>How to Return</h2>
				<ol>
					<li>Log into your account and go to Order History</li>
					<li>Select the order containing the item(s) you wish to return</li>
					<li>Click "Start Return" and follow the prompts</li>
					<li>
						Print your prepaid shipping label and drop off at any carrier
						location
					</li>
				</ol>
			</section>
		</PageLayout>
	)
}

export function SizeGuidePage() {
	return (
		<PageLayout title="Size Guide">
			<p className="static-page__intro">
				Find your perfect fit with our comprehensive size guide. All
				measurements are body measurements in inches unless otherwise noted.
			</p>

			<section className="static-page__section">
				<h2>Women's Apparel</h2>
				<div className="static-page__table-wrap">
					<table className="static-page__table">
						<thead>
							<tr>
								<th>Size</th>
								<th>Chest</th>
								<th>Waist</th>
								<th>Hip</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>XS</td>
								<td>32-34</td>
								<td>25-27</td>
								<td>35-37</td>
							</tr>
							<tr>
								<td>S</td>
								<td>35-37</td>
								<td>28-30</td>
								<td>38-40</td>
							</tr>
							<tr>
								<td>M</td>
								<td>38-40</td>
								<td>31-33</td>
								<td>41-43</td>
							</tr>
							<tr>
								<td>L</td>
								<td>41-43</td>
								<td>34-36</td>
								<td>44-46</td>
							</tr>
							<tr>
								<td>XL</td>
								<td>44-46</td>
								<td>37-40</td>
								<td>47-49</td>
							</tr>
						</tbody>
					</table>
				</div>
			</section>

			<section className="static-page__section">
				<h2>Men's Apparel</h2>
				<div className="static-page__table-wrap">
					<table className="static-page__table">
						<thead>
							<tr>
								<th>Size</th>
								<th>Chest</th>
								<th>Waist</th>
								<th>Hip</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>XS</td>
								<td>34-36</td>
								<td>28-30</td>
								<td>34-36</td>
							</tr>
							<tr>
								<td>S</td>
								<td>36-38</td>
								<td>30-32</td>
								<td>36-38</td>
							</tr>
							<tr>
								<td>M</td>
								<td>38-40</td>
								<td>32-34</td>
								<td>38-40</td>
							</tr>
							<tr>
								<td>L</td>
								<td>40-42</td>
								<td>34-36</td>
								<td>40-42</td>
							</tr>
							<tr>
								<td>XL</td>
								<td>42-44</td>
								<td>36-38</td>
								<td>42-44</td>
							</tr>
						</tbody>
					</table>
				</div>
			</section>

			<section className="static-page__section">
				<h2>Shoe Sizes</h2>
				<div className="static-page__table-wrap">
					<table className="static-page__table">
						<thead>
							<tr>
								<th>EU</th>
								<th>UK</th>
								<th>US</th>
								<th>Foot Length (cm)</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>38</td>
								<td>5</td>
								<td>6</td>
								<td>24.1</td>
							</tr>
							<tr>
								<td>39</td>
								<td>6</td>
								<td>7</td>
								<td>24.8</td>
							</tr>
							<tr>
								<td>40</td>
								<td>6.5</td>
								<td>7.5</td>
								<td>25.4</td>
							</tr>
							<tr>
								<td>41</td>
								<td>7.5</td>
								<td>8.5</td>
								<td>26.0</td>
							</tr>
							<tr>
								<td>42</td>
								<td>8</td>
								<td>9</td>
								<td>26.7</td>
							</tr>
							<tr>
								<td>43</td>
								<td>9</td>
								<td>10</td>
								<td>27.3</td>
							</tr>
							<tr>
								<td>44</td>
								<td>9.5</td>
								<td>10.5</td>
								<td>27.9</td>
							</tr>
						</tbody>
					</table>
				</div>
			</section>

			<section className="static-page__section">
				<h2>How to Measure</h2>
				<ul>
					<li>
						<strong>Chest:</strong> Measure around the fullest part of your
						chest, keeping the tape horizontal.
					</li>
					<li>
						<strong>Waist:</strong> Measure around your natural waistline,
						keeping the tape comfortably loose.
					</li>
					<li>
						<strong>Hip:</strong> Measure around the fullest part of your hips.
					</li>
					<li>
						<strong>Foot:</strong> Stand on a piece of paper and trace your
						foot. Measure from heel to longest toe.
					</li>
				</ul>
				<p className="static-page__note">
					If you fall between sizes, we recommend sizing up for a more relaxed
					fit.
				</p>
			</section>
		</PageLayout>
	)
}

export function Contact() {
	return (
		<PageLayout title="Contact Us">
			<p className="static-page__intro">
				We're here to help! Reach out to our customer service team with any
				questions about orders, products, or general inquiries.
			</p>

			<section className="static-page__section">
				<h2>Customer Service</h2>
				<div className="static-page__contact-grid">
					<div className="static-page__contact-card">
						<Icon
							name="user"
							size={24}
						/>
						<h3>Email</h3>
						<p>hello@modern-fashion.com</p>
						<span>Response within 24 hours</span>
					</div>
					<div className="static-page__contact-card">
						<Icon
							name="truck"
							size={24}
						/>
						<h3>Order Inquiries</h3>
						<p>orders@modern-fashion.com</p>
						<span>Track, modify, or return orders</span>
					</div>
				</div>
			</section>

			<section className="static-page__section">
				<h2>Hours of Operation</h2>
				<ul>
					<li>
						<strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM EST
					</li>
					<li>
						<strong>Saturday:</strong> 10:00 AM - 4:00 PM EST
					</li>
					<li>
						<strong>Sunday:</strong> Closed
					</li>
				</ul>
			</section>

			<section className="static-page__section">
				<h2>Frequently Asked Questions</h2>
				<div className="static-page__faq">
					<details>
						<summary>How do I track my order?</summary>
						<p>
							Once your order ships, you'll receive an email with tracking
							information. You can also track your order by signing into your
							account and viewing your order history.
						</p>
					</details>
					<details>
						<summary>Can I modify or cancel my order?</summary>
						<p>
							Orders can be modified or cancelled within 1 hour of placement.
							After that, please contact us and we'll do our best to accommodate
							your request before the order ships.
						</p>
					</details>
					<details>
						<summary>Do you ship internationally?</summary>
						<p>
							Currently, we ship to the United States only. We're working on
							expanding our shipping options — sign up for our newsletter to be
							notified when international shipping becomes available.
						</p>
					</details>
				</div>
			</section>

			<p className="static-page__disclaimer">
				<em>This is a demo store. No real customer service is available.</em>
			</p>
		</PageLayout>
	)
}
