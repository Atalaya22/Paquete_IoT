/****** Object:  Table [dbo].[Linia]    Script Date: 18/05/2020 16:24:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Linia](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Inici] [datetime] NOT NULL,
	[Duracio] [time](7) NOT NULL,
	[Final] [datetime] NOT NULL,
	[EstatId] [tinyint] NOT NULL,
	[InfoId] [smallint] NOT NULL,
	[AlarmaId] [smallint] NOT NULL,
	[ProducteId] [smallint] NOT NULL,
	[ProductesTotals] [int] NOT NULL,
	[RebuigTotal] [int] NULL,
 CONSTRAINT [PK_Linia] PRIMARY KEY CLUSTERED
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Linia]    Script Date: 18/05/2020 16:24:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Temp_Linia](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Inici] [datetime] NOT NULL,
	[EstatId] [tinyint] NOT NULL,
	[InfoId] [smallint] NOT NULL,
	[AlarmaId] [smallint] NOT NULL,
	[ProducteId] [smallint] NOT NULL,
	[ProductesTotals] [int] NOT NULL,
	[RebuigTotal] [int] NULL,
 CONSTRAINT [PK_Temp_Linia] PRIMARY KEY CLUSTERED
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Linia_Cadencies]    Script Date: 18/05/2020 16:24:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Linia_Cadencies](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Inici] [datetime] NULL,
	[Cadencia] [float] NULL,
 CONSTRAINT [PK_Linia_Cadencies] PRIMARY KEY CLUSTERED
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Info_Aranya_Productes]    Script Date: 18/05/2020 12:49:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Info_Linia_Productes](
	[Id] [int] NOT NULL,
	[Nom] [varchar](max) NOT NULL,
	[Inici] [datetime] NOT NULL,
	[IdIntern] [int] IDENTITY(1,1) NOT NULL,
 CONSTRAINT [PK_Info_Linia_Productes] PRIMARY KEY CLUSTERED
(
	[IdIntern] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
